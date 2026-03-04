from flask import Flask, request, jsonify
from flask_cors import CORS
from passlib.hash import pbkdf2_sha256
import json
import os

app = Flask(__name__)
CORS(app)

DB_FILE = 'usuarios.json'

@app.route('/registro', methods=['POST'])
def registro():
    datos = request.json
    usuario = datos.get('user')
    password = datos.get('pass')

    if not usuario or not password:
        return jsonify({"status": "error", "msg": "Campos vacíos"}), 400

    password_hash = pbkdf2_sha256.hash(password)

    usuarios = []
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, 'r') as f:
                content = f.read().strip()
                usuarios = json.loads(content) if content else []
        except:
            usuarios = []

    usuarios.append({"user": usuario, "pass_hash": password_hash})

    with open(DB_FILE, 'w') as f:
        json.dump(usuarios, f, indent=4)

    return jsonify({"status": "success", "msg": "Hash guardado"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
    
@app.route('/login', methods=['POST'])
def login():
    datos = request.json
    usuario_intento = datos.get('user')
    password_intento = datos.get('pass')

    if os.path.exists(DB_FILE):
        with open(DB_FILE, 'r') as f:
            content = f.read().strip()
            usuarios = json.loads(content) if content else []
            
        # Buscar al usuario en la lista
        for u in usuarios:
            if u['user'] == usuario_intento:
                # Verificar si la contraseña coincide con el hash
                if pbkdf2_sha256.verify(password_intento, u['pass_hash']):
                    return jsonify({"status": "success", "msg": "Acceso concedido"})
                else:
                    return jsonify({"status": "error", "msg": "Contraseña incorrecta"}), 401
                    
    return jsonify({"status": "error", "msg": "Usuario no encontrado"}), 404
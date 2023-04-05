from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sensors.db'
db = SQLAlchemy(app)

class SensorData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    temperature = db.Column(db.Float)
    humidity = db.Column(db.Float)
    sound = db.Column(db.Float)
    tilt = db.Column(db.Float)

class AlarmTime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    alarm_time = db.Column(db.String(5))
    alarm_date = db.Column(db.String(10))
    is_active = db.Column(db.Boolean, default=True)

@app.route('/sensors', methods=['GET', 'POST'])
def sensors():
    if request.method == 'GET':
        data = SensorData.query.all()
        results = []
        for sensor in data:
            results.append({'id': sensor.id, 'timestamp': sensor.timestamp, 'temperature': sensor.temperature, 'humidity': sensor.humidity, 'sound': sensor.sound, 'tilt': sensor.tilt})
        return jsonify({'sensors': results})
    elif request.method == 'POST':
        data = request.get_json()
        new_sensor = SensorData(temperature=data['temperature'], humidity=data['humidity'], sound=data['sound'], tilt=data['tilt'])
        db.session.add(new_sensor)
        db.session.commit()
        return jsonify({'message': 'Sensor data saved successfully!'})

@app.route('/alarm', methods=['GET', 'POST', 'DELETE'])
def alarm():
    if request.method == 'GET':
        data = AlarmTime.query.all()
        results = []
        for alarm in data:
            results.append({'id': alarm.id, 'alarm_time': alarm.alarm_time, 'alarm_date': alarm.alarm_date, 'is_active': alarm.is_active})
        return jsonify({'alarm_times': results})
    elif request.method == 'POST':
        data = request.get_json()
        new_alarm = AlarmTime(alarm_time=data['time'], alarm_date=data['date'], is_active=True)
        db.session.add(new_alarm)
        db.session.commit()
        return jsonify({'message': 'Alarm times saved successfully!'})
    elif request.method == 'DELETE':
        data = request.get_json()
        alarm = AlarmTime.query.filter_by(alarm_time=data['time'], alarm_date=data['date']).first()
        if alarm:
            db.session.delete(alarm)
            db.session.commit()
            return jsonify({'message': 'Alarm deleted successfully!'})
        else:
            return jsonify({'message': 'Alarm not found!'})

@app.route('/check_alarm', methods=['GET'])
def check_alarm():
    now = datetime.now()
    current_time = now.strftime("%H:%M")
    current_date = now.strftime("%Y-%m-%d")
    alarms = AlarmTime.query.filter_by(alarm_time=current_time, alarm_date=current_date, is_active=True).all()
    if alarms:
        return jsonify([True])
    else:
        return jsonify([False])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=8080)
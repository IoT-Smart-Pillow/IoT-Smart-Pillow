import machine
import time
import network
import socket
import struct
import ujson
import _thread
import dht

key = b'[Secret Wokwi key with 256 bits]'
iv = b'secret-iv-123456' # In real life, uos.urandom(16)

MODE_CBC = 2
cipher = aes(key, MODE_CBC, iv)

SSID = "ENDEAVOUR"
PASSWORD = "1234567890"

# connect to WiFi
def connect():
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print("Connecting to network...")
        sta_if.active(True)
        sta_if.connect(SSID, PASSWORD)
        while not sta_if.isconnected():
            pass
    print("Network config:", sta_if.ifconfig())
    print('IP address:', sta_if.ifconfig()[0])


# Connect WiFi
connect()

# Define pin connections for analog input
analog_pin = machine.Pin(34)
pressure_adc = machine.ADC(analog_pin)

# Set ADC gain to maximum value
pressure_adc.atten(machine.ADC.ATTN_0DB)

sound_analog_pin = machine.Pin(32)

led_pin = machine.Pin(26, machine.Pin.OUT)

motor_pin = machine.Pin(0, machine.Pin.OUT)

tilt_pin = machine.Pin(22, machine.Pin.IN)


# Define ADC object for analog input pin
sound_adc = machine.ADC(sound_analog_pin)
sound_adc.atten(machine.ADC.ATTN_0DB)


server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_socket.bind(("0.0.0.0",8080))

#server_socket.listen(5)

# Initialize the DHT22 object
d = dht.DHT22(machine.Pin(14))


def receive_data(sock):
    
    
    while True:
        #client_socket, address = sock.accept()
        #print("Receiveing data:",address)
        while True:
            
            try:
                data, server_address = sock.recvfrom(1024)
                if not data:
                    break
                print("Received data:", data.decode())
                # print("I am here")
                motor_pin.on()
                
                time.sleep(20)
                motor_pin.off()
                
                
            except OSError:
                break
        client_socket.close()

            

def send_data():
    i = 0

    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)    
    sock.connect(('192.168.137.88', 8000))
    print("Server Connected")
    

    # Main loop to continuously read and print pressure data
    while True:
        try:
            # Read analog value from sensor
            
            prsr_sensor_value = pressure_adc.read()
            
            tilt_value = tilt_pin.value()
            
            snd_sensor_value = sound_adc.read()
            
            #if tilt_value == 1:
                #print("Motin Detected"+str(i))
                #i += 1
            
            if prsr_sensor_value > 0 :
                
                led_pin.on()
                #time.sleep(0.5)
                #led_pin.off()
                #time.sleep(0.5)
                
                time.sleep(5)
                led_pin.off()
                #print("Head Detected")
                try:
                    d.measure()
                    temp = d.temperature()
                    hum = d.humidity()
                except:
                    temp = 16
                    hum = 24
                
                data = {
                    "temperature": temp,
                    "humidity":hum,
                    "tilt": tilt_value,
                    "sound": snd_sensor_value
                }
                
                json_data = ujson.dumps(data).encode('utf-8')
                print(data)

                padded = json_bytes + b" " * (16 - len(json_data) % 16)
                encrypted = cipher.encrypt(padded)
                
                # Send data to the server
                # data = snd_sensor_value
                sock.send(encrypted)
                
                
                
                # Turn motor on
                # led_pin.value(1)
                # time.sleep(5)
                
                # Turn motor off
                
                # led_pin.value(0)
                
                # if snd_sensor_value > 500 :
                # Print amplitude value to console
                #print("Amplitude: {}".format(snd_sensor_value))
                
                

            
        except OSError:
            print("Error")
            break
    
    #Close the connection
    #sock.close()

# start the two threads
_thread.start_new_thread(receive_data, (server_socket,))
_thread.start_new_thread(send_data, ())


import network
import urequests
import time
import socket
import ujson
import _thread
import machine
import uos
from ucryptolib import aes
# Set the Wi-Fi credentials
SSID = "ENDEAVOUR"
PASSWORD = "1234567890"

# Connect to the Wi-Fi network
wlan = network.WLAN(network.STA_IF)
wlan.active(True)

# Keep trying to connect to the Wi-Fi network
while not wlan.isconnected():
    try:
        print("Connecting to Wi-Fi network...")
        wlan.connect(SSID, PASSWORD)
        while not wlan.isconnected():
            pass
        print("Wi-Fi network connected!")
    except OSError:
        print("Failed to connect to Wi-Fi network")
        time.sleep(5)
        continue

print('IP address:', wlan.ifconfig()[0])


def task1(url):
    HOST = "0.0.0.0"
    PORT = 8000
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    server_socket.bind((HOST, PORT))
    key = b'[Secret Wokwi key with 256 bits]'
    iv = b'secret-iv-123456'
    MODE_CBC = 2
    decipher = aes(key, MODE_CBC, iv)
    print("Going to receive data")
    while True:
        try:
            time.sleep(5)
            # Receive data from the client
            data, address = server_socket.recvfrom(1024)
            #print(address)
            #print("Received data",data)
            
            
            #decrypted = decipher.decrypt(data)
            #print("Decrypted data",decrypted)
            #json_data = ujson.loads(decrypted.strip())
            #print('Decrypted: {}'.format(json_data))
            
            json_data = ujson.loads(data.decode())
            
            
            print(json_data)
            # Send the data to the server
            #if json_data:
            if json_data:
                # Set up the socket to connect to the server
                client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                client_socket.connect(('34.250.240.208', 8080))
                
                # Create the HTTP request
                request = "POST /sensors HTTP/1.1\r\n"
                request += "Host: 34.250.240.208:8080\r\n"
                request += "Content-Type: application/json\r\n"
                request += "Content-Length: {}\r\n".format(len(ujson.dumps(json_data)))
                request += "\r\n"
                request += ujson.dumps(json_data)
                
                # Send the request to the server
                client_socket.send(request.encode())
                
                # Receive and print the response from the server
                response = client_socket.recv(1024)
                #print(response)
                
                # Close the socket
                client_socket.close()
                
            print("I am here")
        except OSError as e:
            print("Error in task 1:", e)
            #time.sleep(5)

def task2(url):
    while True:
        try:
            time.sleep(30)
            # Send a request to the API endpoint with the parameters
            response = urequests.get(url)
            data = ujson.loads(response.text)[0]
            output = str(data)
            print(output)
            
            if output == 'True':
                # Set up the client socket
                address = ('192.168.137.84', 8080)
                client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
                # Send data to the server
                data = 'True'
                client_socket.sendto(data.encode(),address)
                # Close the connection
                client_socket.close()
                print("I have sent the message to server")
                
                spk = machine.PWM(machine.Pin(2), freq=800, duty=512)
                
                notes = [(440, 0.5), (523, 0.5), (587, 0.5), (659, 0.5), (587, 0.5), (523, 1),
                         (440, 0.5), (523, 0.5), (587, 0.5), (659, 0.5), (587, 0.5), (523, 1),
                         (440, 0.5), (440, 0.5), (440, 0.5), (523, 0.5), (587, 0.5), (659, 1),
                         (440, 0.5), (523, 0.5), (587, 0.5), (659, 0.5), (587, 0.5), (523, 1),
                         (440, 0.5), (523, 0.5), (587, 0.5), (659, 0.5), (587, 0.5), (523, 1),
                         (440, 0.5), (440, 0.5), (440, 0.5), (523, 0.5), (587, 0.5), (659, 1),
                         (440, 0.5), (523, 0.5), (587, 0.5), (659, 0.5), (587, 0.5), (523, 1),
                         (440, 0.5), (523, 0.5), (587, 0.5), (659, 0.5), (587, 0.5), (523, 1),
                         (440, 0.5), (440, 0.5), (440, 0.5), (523, 0.5), (587, 0.5), (659, 1),
                         (440, 0.5), (523, 0.5), (587, 0.5), (659, 0.5), (587, 0.5), (523, 1),
                         (440, 0.5), (523, 0.5), (587, 0.5), (659, 0.5), (587, 0.5), (523, 1),
                         (440, 0.5), (440, 0.5), (440, 0.5), (523, 0.5), (587, 0.5), (659, 1)]

                for note in notes:
                    spk.duty(300)
                    spk.freq(note[0])
                    time.sleep(note[1])
                    spk.duty(0)
                    time.sleep(0.1) 

                # Turn off the speaker
                spk.deinit()
        except OSError as e:
            print("Error in task 2:", e)

# Start the tasks as threads
_thread.start_new_thread(task1, ('http://34.250.240.208:8080/sensors',))
_thread.start_new_thread(task2, ("http://34.250.240.208:8080/check_alarm",))


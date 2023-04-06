
# Smart Pillow

Welcome to the official GitHub repository for NoneType, a group of developers passionate about building innovative technology solutions. This repository serves as a collection of our group projects and code snippets, showcasing our expertise in software development and programming.

This is a group project for the module "CS7NS2 - Internet of Things" at Trinity College Dublin. For this project, we have utilized cutting-edge hardware components, including an ESP32 and ESP32-S2-Kaluga, a pressure sensor, a microphone, a tilt sensor, a temperature and humidity sensor, a vibration motor, and a speaker. We have also used technologies such as Expo React Native and the Victory Native package for data visualization.

Our team has utilized these components and technologies to build an innovative IoT solution that offers a seamless and intuitive user experience. We strive to maintain a high standard of quality in our code and are committed to delivering the best possible solutions to our clients and users.

Whether you're looking for code samples, open-source projects, or want to collaborate with our team on a new project, our repository has something for everyone. Thank you for visiting our repository, and we look forward to sharing our work with you!

### Micropython
Several reasons made Micropython the ideal language for the smart pillow project. First, the language is designed to be light and efficient, which is perfect for IoT devices with limited computing power. This makes it simpler to program the microcontroller to interact with other devices and sensors, and to manage data processing. Second, Micropython has a rich library of modules that enable easy integration with sensors and other hardware components commonly used in IoT devices. These libraries were also quick and easy to integrate, their functionalities ranged from multi-threading to encryption. This enabled faster development and prototyping of the smart pillow system. Third, Micropython has an interactive REPL that allows for testing and debugging of code on the fly, which was useful in finding and fixing errors in the code during development.

### ESP-32
In this project, the smart pillow system relies on the esp32 microcontroller for its core functionality. The esp32 collects data from various sensors inside the pillow, such as a pressure sensor and a motion detector, and sends it to another component called Kaluga. The esp32 is selected for its small size, low energy consumption, and Wi-Fi capability, which allows it to communicate wirelessly with the Kaluga and cloud platforms like AWS IoT. The esp32 has more GPIO pins than other microcontrollers that were evaluated, such as esp8266, Raspberry Pi, and Arduino Uno. These pins are vital for reading inputs and controlling outputs. The esp32 also supports micropython code, which simplifies the testing and development of the system. Therefore, the esp32 is an essential choice for the smart pillow system, as it meets the needs for functionality, compactness, and low energy consumption.

### ESP-32-S2-Kaluga

### Flask API

### Mobile Application
We chose to implement the mobile application using Expo React Native. Expo is an open-source platform that allows developers to build and deploy mobile applications for both iOS and Android platforms using the React Native framework.

React Native is a popular JavaScript framework for building mobile applications, using the same codebase for both platforms. This helps to reduce development time and improve the efficiency of the overall development process.

To visualize the data coming from the sensors, we used the Victory Native package. Victory Native is a charting and visualization library built on top of the React Native framework, making it easy to add charts and graphs to mobile applications.

Overall, the combination of Expo React Native and Victory Native allowed us to create a mobile application that provided an intuitive and user-friendly interface for visualizing and analyzing the data coming from the sensors in our smart pillow.

### Languages Used:
- Micropython
- Python 
- JavaScript (React-Native)

### IDEs involved: 
- VSCode
- Thonny 

### Cloud Resource Used:
- AWS EC2


## Images of the application


<p align="center">
<img src="https://user-images.githubusercontent.com/51954157/230272755-e125ff90-3588-4d20-ab05-dc4aa0585d5d.jpeg" width="250" height="500"/>  &nbsp;&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/51954157/230272787-03d96187-407c-4f82-98bc-fdffe4ad98bd.jpeg" width="250" height="500"/> 
</p>
<br/>
<br/>
![Video](https://youtu.be/zU9AoqL20-M)
<video src="https://youtu.be/zU9AoqL20-M"></video>
<br/>
<br/>

Thank you for taking the time to explore our project! We are proud to have worked together as a team to create this innovative smart pillow using cutting-edge IoT technology. Our hope is that this project will inspire others to think creatively about how IoT can be used to improve everyday life. If you have any questions or feedback, please feel free to reach out to us.

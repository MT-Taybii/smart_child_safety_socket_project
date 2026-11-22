# 🔌 Smart Child Safety Socket

### Interactive Laser-Grid Detection Simulation

A browser-based visual prototype that demonstrates how a smart electrical socket safety system could detect objects or people using multiple laser beams and simulate automatic power control.

## 📌 Project Overview

The Smart Child Safety Socket is an experimental safety-system concept designed to explore how electrical power could be controlled when a person approaches a potentially dangerous electrical socket.

This prototype uses a simulated laser-grid detection chamber containing seven horizontal beams, a child figure, and an adult figure.

Users can drag either figure into the detection area and observe how interrupted beams affect the system's classification and simulated electrical power status.

**Important:** This is a visual JavaScript simulation. It does not use physical laser sensors, identify real children, measure actual human height, or control household electricity.

## ✨ Features

- Interactive laser-grid simulation.
- Seven horizontal detection beams.
- Draggable child and adult figures.
- Real-time beam interruption detection.
- Detection-zone monitoring.
- Object classification based on interrupted beams.
- Simulated electrical power ON/OFF status.
- Automatic system updates while dragging.
- Fail-safe simulation for multiple or uncertain detections.
- Reset button to restore the initial simulation.
- Responsive interface for different screen sizes.

## ⚙️ How It Works

The simulation contains seven horizontal beams positioned between two walls.

Each beam has:

- A transmitter (TX).
- A laser beam.
- A receiver (RX).

When a figure enters the detection chamber, the JavaScript program checks which beams intersect the figure's rendered bounding box.

The number of interrupted beams determines the simulated classification and power status.

### Detection Logic

| Interrupted Beams   | Classification        | Simulated Power |
| ------------------- | --------------------- | --------------- |
| 0                   | Clear area            | ON              |
| 1–4                 | Small obstruction     | OFF             |
| 5–7                 | Large obstruction     | ON              |
| Multiple figures    | Uncertain / fail-safe | OFF             |
| Uncertain detection | Fail-safe             | OFF             |

**Note:** These are experimental simulation rules, not validated child/adult detection criteria. The classification is based on beam interruption, not actual height or identity.

## 🖥️ Technologies Used

| Technology         | Purpose                          |
| ------------------ | -------------------------------- |
| HTML5              | Project structure                |
| CSS3               | Styling, layout and animations   |
| JavaScript         | Detection logic and interactions |
| Pointer Events API | Drag-and-drop functionality      |
| DOM Manipulation   | Real-time interface updates      |

## 📂 Project Structure

```text
smart-child-safety-socket/
│
├── index.html
├── style.css
└── script.js
```

### File Description

**index.html**

- Creates the simulation interface.
- Defines the detection chamber.
- Contains the child and adult figures.
- Defines the monitoring dashboard.

**style.css**

- Controls the visual design.
- Styles the laser beams and receivers.
- Creates the detection chamber.
- Handles responsive layouts.

**script.js**

- Implements drag-and-drop interactions.
- Calculates interrupted laser beams.
- Determines detection classifications.
- Updates simulated power status.
- Implements the reset functionality.

## 🚀 Getting Started

### 1. Download or Clone the Repository

```bash
git clone https://github.com/MT-Taybii/smart_child_safety_socket_project
```

### 2. Open the Project

Navigate to the project directory.

### 3. Run the Simulation

Open `index.html` in your web browser.

No additional libraries, frameworks, installations, or backend server are required.

## 🎮 How to Use

1. Open the project in your browser.
2. Locate the child and adult figures.
3. Drag either figure into the detection chamber.
4. Observe the interrupted laser beams.
5. Check the system monitoring dashboard.
6. Observe the simulated power status.
7. Press **Reset Simulation** to restore the original positions.

## 🔬 Future Development

The current project is a visual simulation and serves as the foundation for a more advanced hardware-based system.

Planned improvements include:

- [ ] Integration of physical motion sensors.
- [ ] PIR-based movement detection.
- [ ] Integration of a thermal camera.
- [ ] Real human detection using computer vision.
- [ ] Height estimation using depth sensing.
- [ ] Intelligent child-proximity classification.
- [ ] ESP32 or Raspberry Pi integration.
- [ ] Physical sensor-based detection.
- [ ] Hardware-level fail-safe power control.
- [ ] Independent mechanical socket protection.
- [ ] Reliability testing and electrical safety certification.

## 🛡️ Safety Notice

This project is an educational simulation and must not be used as an actual child-protection device.

It does not disconnect real electrical power. Its laser beams, people and electrical status are entirely simulated in the browser.

Any physical implementation involving household electricity requires independent certified protection, qualified electrical engineering, appropriate testing and applicable safety certification.

## 🇵🇰 Project Vision

The long-term vision is to explore the development of an intelligent child-safety electrical system designed with Pakistani households in mind.

The project aims to combine embedded systems, computer vision, sensor technology and electrical safety engineering to create an additional layer of protection against household electrical hazards.

## 📊 Project Status

**Current Status:** Interactive Web Simulation

The initial browser-based prototype is implemented using HTML, CSS and JavaScript. Physical hardware integration and AI-based detection remain future development goals.

## 👨‍💻 Developer

Independent technology project focused on:

- Frontend Development
- JavaScript Programming
- Embedded Systems
- Computer Vision
- Artificial Intelligence
- Smart Home Safety

---

**Building intelligent technology for a safer tomorrow.**

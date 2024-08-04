# Worlds Apart
A low-poly 3D space game featuring procedurally generated planets, a custom physics engine, and distributed server architecture, winning the [StudentHack Hackathon](https://devpost.com/software/worlds-apart-01e5gj).

## Inspiration
Inspired by the captivating low-poly art style for space and the potential of procedurally generated planets, we set out to create a visually stunning 3D game where little astronauts explore vibrant, low-poly worlds. Our goal was to bring this space fantasy to life with a unique and engaging experience.

## What It Does
Worlds Apart offers players an immersive space adventure where they can join dynamically generated worlds using unique game codes. The game features a server infrastructure that manages player connections and waiting rooms efficiently. Players crash-land on various planets, collect items to repair their ship, and explore spherical planets with custom gravity physics.

## How We Built It
- **Server Architecture**: Developed a novel server meshing system to support large player counts. New servers are dynamically created for different space regions.
- **Client-Side Prediction**: Implemented client-side prediction to enhance networking performance, ensuring a smooth experience even on slower connections.
- **Custom Physics Engine**: Built a custom physics engine to handle the unique gravitational forces of small, spherical planets.
- **Modeling and Animation**: Used Blender to create custom models and animations, and integrated them into the game with a three.js-based rendering system and animated state machines for characters.

## Built With
- **3js**
- **Blender**
- **GitHub**
- **GLSL**
- **Next.js**
- **Partykit**
- **React3fibre**
- **TypeScript**
- **Vercel**

## License

```
MIT License

Copyright (c) 2024 YILT Team (Lourenço Silva, Ioan Gwenter, Tom Hewitt, 
Yeshwanth Patil)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

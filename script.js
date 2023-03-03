const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

let secondsPassed;
let oldTimeStamp;
let fps;

setInterval(() => {
        fpsEl.innerHTML = fps;
},1000);

const fpsEl = document.querySelector(".fps");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Circle{
    constructor({position,velocity,color,radius}){
        this.position = position;
        this.velocity = velocity;
        this.color = color;
        this.radius = radius;
    }

    draw(){
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI * 2);
        c.fill();
        c.closePath();
    }

    update(){
        this.draw();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

(function animate(timeStamp){
    c.fillStyle = "black";
    c.fillRect(0,0,canvas.width,canvas.height);

    secondsPassed = (timeStamp - oldTimeStamp) / 1000;

    fps = Math.round(1 / secondsPassed);

    for(let i=0; i<particles.length; i++){
        particles[i].update();
    
    }

    oldTimeStamp = timeStamp;


    requestAnimationFrame(animate);
})();

const colors = ["orange","lime","white","yellow","red","blue"];
window.addEventListener("click",(e) => {
    for(let i=0; i<200; i++){
        particles.push(new Circle({
            position:{
                x:e.clientX,
                y:e.clientY  
            },
            velocity:{
                x:(Math.random() - 0.5) * 5,
                y:(Math.random() - 0.5) * 5
            },
            color:colors[Math.floor(Math.random() * colors.length)],
            radius:(Math.random() * 10) + 5
        }));
    }
})
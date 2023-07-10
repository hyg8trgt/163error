AFRAME.registerComponent("bullets",{
    init:function(){
        
        this.showbullets()
    },
    tick:function(){

    },

    showbullets:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "e"){
                var bullet=document.createElement("a-entity")
                bullet.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:0.1
                })
                bullet.setAttribute("material",{color:"black"})
                var cam=document.querySelector("#camera")
                pos=cam.getAttribute("position")
                bullet.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z})
                // bullet.setAttribute("velocity",{x:0,y:0,z:-3})
                // cam.appendChild(bullet)
                var scene = document.querySelector("#scene")
              
                //get caemra direction with three.js
                var camera=document.querySelector("#camera").object3D;
                
                var direction= new THREE.Vector3();
                camera.getWorldDirection(direction)
                bullet.setAttribute("velocity",direction.multiplyScalar(-10))
                bullet.setAttribute("dyanmic-body",{
                    shape:"sphere",
                    mass:"0"
                })
                var scene = document.querySelector("#scene")
            //    checking collision
                this.shootSound()
                bullet.addEventListener("collide",this.removeBullets)
                scene.appendChild(bullet)
                // console.log(scene)
            }
        })
    },
    removeBullets:function(e){
        console.log(e.detail.target.el)
        console.log(e.detail.body.el)
        var b=e.detail.target.el
        var bHit=e.detail.body.el
        console.log(bHit)


        if(bHit.id.includes("box")){
            console.log("collided")
            bHit.setAttribute("material",{
                opacity:1,
                transparent:true

            })
            var force=new CANNON.Vec3(-2,2,1);
            var worldPoint= new CANNON.Vec3().copy(bHit.getAttribute("position"))
            bHit.body.applyImpulse(force,worldPoint)
            b.removeEventListener("collide",this.showbullets)

            var scene=document.querySelector("#scene")
            scene.removeChild()
        }
    },
    shootSound:function(){
        var entity=document.querySelector("#sound1")
        entity.components.sound.playSound()
    }
})
    
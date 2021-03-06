import { 
    Mesh,
    MeshBasicMaterial,
    Object3D,
    TextureLoader,
    SphereGeometry} from "three";

const SPEED_FACTOR = 0.01;
export default class Planet extends Mesh {
    constructor({ distance, speed, radius = 1, color = 0xFFFFFF }) {
        let geometry, material, texture;
        // load a texture, set wrap mode to repeat
        texture = new TextureLoader().load( "assets/images/textures/test.jpeg" );
        geometry = new SphereGeometry(radius, 32, 32);
        material = new MeshBasicMaterial({
            color: color,
            map: texture
        });

        super(geometry, material);

        this.tick = 0;
        this._speed = speed;
        this.distance = distance;
    }

    _getSpeed() {
        return this._speed * SPEED_FACTOR;
    }

    update () {
        this.tick += 1;
        this.rotation.y += this._getSpeed();
        this.position.z = Math.sin(this.tick * this._getSpeed() ) * this.distance;
        this.position.x = Math.cos(this.tick * this._getSpeed() ) * this.distance;
    }
}
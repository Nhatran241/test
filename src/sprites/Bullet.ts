import { raceConfig } from "../configs/GameConfig";
import { MarbleColors } from "../enums/Colors";

export class Bullet extends Phaser.GameObjects.Container {

    private _circleBody: Phaser.GameObjects.Arc;
    private _nameText: Phaser.GameObjects.Text;
    private _color?: MarbleColors;
    private _lifeSpan?: number;

    constructor(scene: Phaser.Scene, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[]) {
        super(scene, x, y, children);
        this._circleBody = scene.add.circle(0, 0, raceConfig.BulletW * 0.5, 0xffffff);

        scene.physics.add.existing(this);

        this.physicsBody.setCircle(raceConfig.BulletW * 0.5, - raceConfig.BulletW * 0.5, - raceConfig.BulletW * 0.5);
        this.physicsBody.setBounce(1, 1);
        this.physicsBody.setCollideWorldBounds(true);
        this.physicsBody.setBoundsRectangle(new Phaser.Geom.Rectangle(
            0, 0,
            raceConfig.BlockW * raceConfig.RaceMapCols, raceConfig.BlockH * raceConfig.RaceMapRows
        ));

        // Create a Text object to display the name
        this._nameText = scene.add.text(0, 0, "", {
            fontFamily: 'Arial Calibri',
            fontSize: '12px',
            color: '#ffffff',
            fontStyle: 'bolder',
        }).setOrigin(0.5, 0.5).setDepth(1);

        this.add([this._circleBody, this._nameText]);

        // live time last 10 seconds
        this._lifeSpan = 10000;
    }

    get physicsBody() {
        return this.body as Phaser.Physics.Arcade.Body;
    }

    get color() {
        return this._color;
    }

    update(time: number, delta: number) {
        this._lifeSpan! -= delta;

        if (this._lifeSpan! <= 0) {
            this.destroy();
        }
    };

    makeColor(color: MarbleColors) {
        let bodyColor = 0xffffff;

        if (color !== MarbleColors.Grey) {
            bodyColor = raceConfig.bulletColors[color];
        }

        this._circleBody.fillColor = bodyColor;
        this._color = color;
    }

    setName(name: string) {
        this._nameText.setText(name);
    }
}

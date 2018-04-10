window.addEventListener('load', () => {new Main();});

class Main {

	private stage: createjs.Stage;
	private obj: createjs.Shape;

	/* コンストラクタ（初期処理） */
	constructor() {
		this.stage = new createjs.Stage('myCanvas');

		/* グラデーションサンプル 円形 */
		const graphics1:createjs.Graphics  = new createjs.Graphics();
		graphics1
		.beginRadialGradientFill(["#fff", "#00ffff", "#fff", "#ffff00"], [0, 0.4, 0.8, 1], 240, 280, 100, 340, 380, 280)
		.drawRect(0, 0, 480, 560);
		const shape:createjs.Shape = new createjs.Shape(graphics1);
		this.stage.addChild(shape);

		/* グラデーションサンプル　線形 */
		const graphics2:createjs.Graphics  = new createjs.Graphics();
		graphics2
		.beginLinearGradientFill(["#ffff00", "rgba(0,0,255,.5)"], [0, 1], 960, 0, 480, 0)
		.drawRect(480, 0, 480, 560);
		const shape2:createjs.Shape = new createjs.Shape(graphics2);
		this.stage.addChild(shape2);

		/* 枠線サンプル */
		const strokeWidth:number = 30;
		const graphics3:createjs.Graphics = new createjs.Graphics();
		graphics3
		.setStrokeDash([], 0)
		// .setStrokeDash([strokeWidth, strokeWidth * 2], 0)
		// .setStrokeDash([strokeWidth, strokeWidth], 0)
		.setStrokeStyle(strokeWidth, 0)
		.beginFill('#fff')
		// .beginStroke('#000')
		.beginLinearGradientStroke(["#fff","#000"], [0, 1], 0, 0, 0, 120)
		.drawEllipse(300, 100, 300, 300)
		.endStroke();

		const shape3:createjs.Shape = new createjs.Shape(graphics3);
		this.stage.addChild(shape3);


		if (createjs.Touch.isSupported()) createjs.Touch.enable(this.stage);

		this.obj = new createjs.Shape();
		this.stage.addChild(this.obj);
		this.stage.addEventListener('stagemousedown', this.handleDown);

		this.editSelect();


		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		createjs.Ticker.addEventListener('tick', () => { this.stage.update(); });

		(<HTMLInputElement>document.querySelector('#buttonReset')).addEventListener('click', ():void => {
			if (confirm('リセットしてもよろしいですか？')) this.obj.graphics.clear();
		});
	}

	/* 描画タイプ選択 */
	private editSelect = ():void => {
		Array.from(document.querySelectorAll('.collapsible > li'), elm => {
			elm.addEventListener('click', ():void => {
				switch (elm.getAttribute('id')) {
					case 'pen':
						break;
					case 'stamp':
						break;
					case 'text':
						break;
					case 'image':
						break;
				}
			});
		});
	}

	/* マウス押下時の処理 */
	private handleDown = (event: createjs.MouseEvent):void => {
		const paintColor: string = (<HTMLInputElement>document.querySelector('#inputColor')).value;
		const paintStyle: number = Number((<HTMLInputElement>document.querySelector('#inputStyle')).value);

		this.obj.graphics.beginStroke(paintColor).setStrokeStyle(paintStyle, 1).moveTo(event.stageX, event.stageY);

		this.stage.addEventListener('stagemousemove', this.handleMove);
		this.stage.addEventListener('stagemouseup', this.handleUp);

	}

	/* マウスが動いた時の処理 */
	private handleMove = (event: createjs.MouseEvent):void => {
		this.obj.graphics.lineTo(event.stageX, event.stageY);
	}

	/* マウスが離れた時の処理 */
	private handleUp = (event: createjs.MouseEvent):void => {
		this.obj.graphics.lineTo(event.stageX, event.stageY);
		this.obj.graphics.endStroke();
		this.stage.removeEventListener('stagemousemove', this.handleMove);
		this.stage.removeEventListener('stagemouseup', this.handleUp);
	}
}

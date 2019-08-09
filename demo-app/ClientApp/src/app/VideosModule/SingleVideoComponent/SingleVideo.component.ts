import { Component } from '@angular/core';

@Component({
	selector: 'single-video',
	template: `
		<div style="text-align: center">
			<!-- Apparently the HTML5 'video' tag can only play 3 types of video files.
                 .mp4 (the most common), webm and Ogg (older format; not well supported). -->
			<video src="../../../assets/Robin - 21723.mp4" poster="initial_static_picture.jpg" width="480" controls>
			</video>
		</div>
	`,
	styles: [
	],
})
export class SingleVideoComponent {

}

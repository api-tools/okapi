export class ResizeHandler {
    protected document: Document;

    constructor(document: Document) {
        this.document = document;
        let resizable = this.createResizable()
        this.attachResizers(resizable)
    }

    private attachResizers(resizable: any) {
        this.document.querySelectorAll('.container-resizer').forEach(function (element) {
            resizable(element);
        });
    }

    private createResizable() {
        return (resizer: any) => {
            const direction = resizer.getAttribute('data-direction') || 'horizontal';
            const prevSibling = resizer.previousElementSibling;
            const nextSibling = resizer.nextElementSibling;

            // The current position of mouse
            let x = 0;
            let y = 0;
            let prevSiblingHeight = 0;
            let prevSiblingWidth = 0;
            let nextSiblingWidth = 0;

            // Handle the mousedown event when user clicks the resizer
            const mouseDownHandler = (e: any) => {
                // Get the current mouse position
                x = e.clientX;
                y = e.clientY;

                const rect = prevSibling.getBoundingClientRect();

                prevSiblingHeight = rect.height;
                prevSiblingWidth = rect.width;
                nextSiblingWidth = rect.width

                this.document.addEventListener('mousemove', mouseMoveHandler);
                this.document.addEventListener('mouseup', mouseUpHandler);
            };

            // Handle the mouse move event when user drags the resizer
            const mouseMoveHandler = (e: any) => {
                // How far the mouse has been moved
                const dx = e.clientX - x;
                const dy = e.clientY - y;

                switch (direction) {
                    case 'vertical':
                        const h =
                            ((prevSiblingHeight + dy) * 100) /
                            resizer.parentNode.getBoundingClientRect().height;
                        prevSibling.style.height = `${h}%`;
                        break;
                    case 'horizontal':
                    default:
                        const w =
                            ((prevSiblingWidth + dx) /
                            resizer.parentNode.getBoundingClientRect().width) * 100;
                        const wn = 100 - w;
                        prevSibling.style.width = `${w}%`;
                        nextSibling.style.width = `${wn}%`;
                        break;
                }

                const cursor =
                    direction === 'horizontal' ? 'col-resize' : 'row-resize';
                resizer.style.cursor = cursor;
                this.document.body.style.cursor = cursor;

                prevSibling.style.userSelect = 'none';
                prevSibling.style.pointerEvents = 'none';

                nextSibling.style.userSelect = 'none';
                nextSibling.style.pointerEvents = 'none';
            };

            // Handle the mouseup event when user stops resizing
            const mouseUpHandler = () => {
                resizer.style.removeProperty('cursor');
                this.document.body.style.removeProperty('cursor');

                prevSibling.style.removeProperty('user-select');
                prevSibling.style.removeProperty('pointer-events');

                nextSibling.style.removeProperty('user-select');
                nextSibling.style.removeProperty('pointer-events');

                this.document.removeEventListener('mousemove', mouseMoveHandler);
                this.document.removeEventListener('mouseup', mouseUpHandler);
            };

            resizer.addEventListener('mousedown', mouseDownHandler);
        };
    }
}

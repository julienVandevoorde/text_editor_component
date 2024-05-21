import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import Quill from 'quill';

@customElement('bb-editor')
export class BbEditor extends LitElement {
    @property({ type: String }) format: string = 'html';
    @query('.editor') editor!: HTMLDivElement;

    private quill?: Quill;

    static styles = css`
        :host {
            display: block;
            padding: 20px;
        }
        .editor { 
            height: 300px; 
        }
    `;

    createRenderRoot() {
        return this;
    }

    firstUpdated() {
        const options = {
            placeholder: 'Type here',
            theme: 'snow'
        };

        this.quill = new Quill(this.editor, options);
        console.log('Quill initialized');

        this.quill.on('text-change', () => {
            this.handleTextChange();
        });
    }

    handleTextChange() {
        const content = this.quill?.root.innerHTML;
        if (content) {
            this.dispatchEvent(new CustomEvent('bb-edited', {
                detail: { content },
                bubbles: true,
                composed: true
            }));
        }
    }

    protected render() {
        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@2.0.1/dist/quill.snow.css">
            <div class="editor"></div>
        `;
    }
}

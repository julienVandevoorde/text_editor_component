import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import Quill from 'quill';

@customElement('bb-editor')
export class BbEditor extends LitElement {
    @property({ type: String }) format: string;
    @state() saved: boolean;

    private quill?: Quill;

    static styles = css`
        :host {
            display: block;
            padding: 16px;
        }
        .editor { 
            height: 300px; 
        }
    `;

    firstUpdated() {
        this.quill = new Quill(this.renderRoot.querySelector(".editor") as HTMLElement, {
            theme: this.format ? this.format : 'snow'
        });
        
    }

    protected render() {
        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@2.0.1/dist/quill.snow.css">
            <div class="editor"></div>
        `;
    }

}

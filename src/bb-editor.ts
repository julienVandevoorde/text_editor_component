import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import Quill from 'quill';

@customElement('bb-editor')
export class BbEditor extends LitElement {
    @property({ type: String }) format: string;
    @state() saved: boolean;
    @query('div.editor') editor: HTMLDivElement;
    
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
        
        const options = {
            placeholder: 'écrire ici :)',
            theme: 'snow'
        };

        this.quill = new Quill(this.editor, options);        
    }

    protected render() {
        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@2.0.1/dist/quill.snow.css">
            <div class="editor"></div>
        `;
    }

}

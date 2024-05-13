import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import Quill from 'quill';

@customElement('bb-editor')
export class BbEditor extends LitElement {
    @property({ type: String }) format: string;
    @state() saved: boolean;
    @query('.editor') editor: HTMLDivElement;
    @query('.result') result: HTMLDivElement;
    
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

    textEdited(){

    }

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
            <textarea class="result"></textarea>
        `;
    }

}

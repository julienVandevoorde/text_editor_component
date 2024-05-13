import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import Quill from 'quill';

@customElement('bb-editor')
export class BbEditor extends LitElement {
    @property({ type: String }) format: string = 'snow';
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
        button {
            margin-top: 10px;
        }
    `;

    // Utiliser le Light DOM au lieu du Shadow DOM
    createRenderRoot() {
        return this;
    }

    firstUpdated() {
        const options = {
            placeholder: 'Écrire ici :)',
            theme: this.format
        };
        this.quill = new Quill(this.editor, options);
        
        // Ajout de l'écouteur d'événements sur le bouton
        this.querySelector('button')?.addEventListener('click', () => this.saveContent());
    }

    protected render() {
        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@2.0.1/dist/quill.snow.css">
            <div class="editor"></div>
            <button>Save Content</button>
        `;
    }

    saveContent() {
        const content = this.quill?.getContents();
        console.log('Saving content:', content);  // Exemple : affiche le contenu à sauvegarder
        
        // Dispatch l'événement avec les détails du contenu sauvegardé
        this.dispatchEvent(new CustomEvent('content-saved', {
            detail: { content },
            bubbles: true,
            composed: true
        }));
    }
}
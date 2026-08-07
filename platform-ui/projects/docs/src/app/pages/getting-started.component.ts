import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CodeBlockComponent } from '../shared/code-block.component';

type Framework = 'angular' | 'react' | 'html';

@Component({
  selector: 'docs-getting-started',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="gs-wrap">

    <!-- ══ CONTENT ══════════════════════════════════════════════ -->
    <article class="gs-content">

      <nav class="breadcrumb">
        <span>Docs</span><span class="bc-sep">/</span>
        <span class="bc-cur">Getting Started</span>
      </nav>

      <h1 class="gs-title">Getting Started</h1>
      <p class="gs-lead">
        <strong>&#64;bhairab-patra/platform-ui</strong> is a universal UI component library
        published to <strong>GitHub Packages</strong>. The same 21 components work in
        <strong>Angular</strong>, <strong>React</strong>, and <strong>plain HTML</strong> —
        pick your framework below and follow the steps.
      </p>

      <!-- Framework picker tabs -->
      <div class="fw-tabs">
        <button *ngFor="let fw of frameworks"
          class="fw-tab"
          [class.fw-tab--active]="active === fw.id"
          (click)="setFramework(fw.id)">
          <span class="fw-tab__icon" [innerHTML]="fw.icon"></span>
          {{ fw.label }}
        </button>
      </div>

      <hr class="gs-hr">

      <!-- ╔══════════════════════════════════════════════════════╗ -->
      <!-- ║  ANGULAR                                             ║ -->
      <!-- ╚══════════════════════════════════════════════════════╝ -->
      <ng-container *ngIf="active === 'angular'">

        <div class="fw-badge fw-badge--angular">Angular 19</div>

        <section id="ng-prereq" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">1</span> Prerequisites</h2>
          <ul class="gs-list">
            <li>Node.js 18+ and npm 9+</li>
            <li>Angular CLI 19+&nbsp;&nbsp;<code>npm install -g &#64;angular/cli</code></li>
            <li>An existing Angular 19 project (standalone or NgModule)</li>
            <li>A GitHub account with access to <strong>GitHub Packages</strong></li>
          </ul>
          <div class="note note--info">
            Platform UI is built with <strong>Angular 19 standalone APIs</strong>. NgModule
            apps still work — import components individually in your NgModule's <code>imports</code>.
          </div>
        </section>

        <section id="ng-npmrc" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">2</span> Configure npm for GitHub Packages</h2>
          <p class="gs-p">Create a <code>.npmrc</code> file in your project root. Replace the token with your own GitHub Personal Access Token (needs <code>read:packages</code> scope):</p>
          <app-code lang=".npmrc" [id]="'ng-npmrc'" [text]="code.ng.npmrc" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="note note--warn">
            Never commit <code>.npmrc</code> to git — add it to <code>.gitignore</code>.
          </div>
        </section>

        <section id="ng-install" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">3</span> Install the Library</h2>
          <app-code lang="bash" [id]="'ng-install'" [text]="code.ng.install" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>

          <h3 class="gs-h3" style="margin-top:24px">If you use Module Federation (admin-hub / tenant-management-ui)</h3>
          <p class="gs-p">Add the package to the <code>skip</code> list in <code>federation.config.js</code> so Native Federation doesn't try to bundle it:</p>
          <app-code lang="federation.config.js" [id]="'ng-fed'" [text]="code.ng.federation" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="ng-styles" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">4</span> Add Global Styles</h2>
          <p class="gs-p">In <code>angular.json</code> add the styles entry (Poppins font + CSS custom properties):</p>
          <app-code lang="angular.json" [id]="'ng-styles'" [text]="code.ng.styles" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="ng-import" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">5</span> Import Components</h2>

          <h3 class="gs-h3">Standalone component (recommended)</h3>
          <app-code lang="TypeScript" [id]="'ng-sa'" [text]="code.ng.standalone" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>

          <h3 class="gs-h3" style="margin-top:24px">NgModule (legacy apps)</h3>
          <app-code lang="TypeScript" [id]="'ng-mod'" [text]="code.ng.ngModule" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="ng-use" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">6</span> Full App Shell Example</h2>
          <p class="gs-p">Drop <code>pui-app-shell</code> into your root component and get a complete layout — header, collapsible sidebar, and hamburger — in one tag:</p>
          <app-code lang="app.component.ts" [id]="'ng-shell'" [text]="code.ng.shell" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="ng-verify" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">7</span> Run &amp; Verify</h2>
          <app-code lang="bash" [id]="'ng-serve'" [text]="'ng serve'" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="note note--success" style="margin-top:18px">
            Open <strong>http://localhost:4200</strong>. You should see the teal header, sidebar rail, and hamburger toggle.
          </div>
        </section>

      </ng-container>

      <!-- ╔══════════════════════════════════════════════════════╗ -->
      <!-- ║  REACT                                               ║ -->
      <!-- ╚══════════════════════════════════════════════════════╝ -->
      <ng-container *ngIf="active === 'react'">

        <div class="fw-badge fw-badge--react">React 19</div>

        <section id="rx-prereq" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">1</span> Prerequisites</h2>
          <ul class="gs-list">
            <li>Node.js 18+ and npm 9+</li>
            <li>A React 19 project — Vite is recommended</li>
            <li>A GitHub account with a Personal Access Token (<code>read:packages</code> scope)</li>
          </ul>
          <div class="note note--info">
            React 19 added <strong>first-class Web Components support</strong>.
            Custom element attributes, properties, and events all work natively — no wrapper library needed.
          </div>
        </section>

        <section id="rx-create" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">2</span> Create a React App (skip if existing)</h2>
          <app-code lang="bash" [id]="'rx-create'" [text]="code.react.create" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="rx-npmrc" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">3</span> Configure npm for GitHub Packages</h2>
          <p class="gs-p">Create <code>.npmrc</code> in your project root:</p>
          <app-code lang=".npmrc" [id]="'rx-npmrc'" [text]="code.react.npmrc" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="note note--warn">Never commit <code>.npmrc</code> to git — add it to <code>.gitignore</code>.</div>
        </section>

        <section id="rx-install" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">4</span> Install the Library</h2>
          <app-code lang="bash" [id]="'rx-install'" [text]="code.react.install" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="rx-bootstrap" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">5</span> Bootstrap Web Components</h2>
          <p class="gs-p">Import the elements bundle once at the top of <code>src/main.tsx</code>. This registers all <code>pui-*</code> custom elements before React renders:</p>
          <app-code lang="main.tsx" [id]="'rx-main'" [text]="code.react.main" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="rx-types" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">6</span> Add TypeScript Declarations</h2>
          <p class="gs-p">Create <code>src/pui.d.ts</code> so TypeScript recognises all <code>pui-*</code> tags in JSX:</p>
          <app-code lang="src/pui.d.ts" [id]="'rx-types'" [text]="code.react.types" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <p class="gs-p" style="margin-top:14px">Reference it in <code>tsconfig.json</code>:</p>
          <app-code lang="tsconfig.json" [id]="'rx-tsref'" [text]="code.react.tsconfig" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="rx-use" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">7</span> Full App Shell Example</h2>
          <p class="gs-p">String inputs use kebab-case HTML attributes. Object / array inputs must be set via a React <code>ref</code> on the DOM property:</p>
          <app-code lang="src/App.tsx" [id]="'rx-app'" [text]="code.react.app" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="rx-events" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">8</span> Handling Events</h2>
          <p class="gs-p">Custom element events are native <code>CustomEvent</code>s. Use <code>addEventListener</code> via a ref:</p>
          <app-code lang="TSX" [id]="'rx-events'" [text]="code.react.events" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="rx-verify" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">9</span> Run &amp; Verify</h2>
          <app-code lang="bash" [id]="'rx-serve'" [text]="'npm run dev'" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="note note--success" style="margin-top:18px">
            Open <strong>http://localhost:5173</strong>. You should see the full Platform UI shell inside your React app.
          </div>
        </section>

      </ng-container>

      <!-- ╔══════════════════════════════════════════════════════╗ -->
      <!-- ║  PLAIN HTML                                          ║ -->
      <!-- ╚══════════════════════════════════════════════════════╝ -->
      <ng-container *ngIf="active === 'html'">

        <div class="fw-badge fw-badge--html">Plain HTML</div>

        <div class="note note--info" style="margin-bottom:32px">
          No build tool, no bundler, no framework. Install the package via npm, then serve over HTTP.
          Angular Elements <strong>cannot run from <code>file://</code></strong> — you must use a local HTTP server.
        </div>

        <section id="html-npmrc" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">1</span> Configure npm for GitHub Packages</h2>
          <p class="gs-p">Create <code>.npmrc</code> in your project folder:</p>
          <app-code lang=".npmrc" [id]="'html-npmrc'" [text]="code.html.npmrc" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="note note--warn">Never commit <code>.npmrc</code> to git.</div>
        </section>

        <section id="html-install" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">2</span> Install the Package</h2>
          <app-code lang="bash" [id]="'html-install'" [text]="code.html.install" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <p class="gs-p" style="margin-top:12px">This creates <code>node_modules/&#64;bhairab-patra/platform-ui/elements/</code> with two files you need:</p>
          <div class="file-list">
            <div class="file-row">
              <span class="file-icon">📄</span>
              <div>
                <div class="file-name">node_modules/&#64;bhairab-patra/platform-ui/elements/pui-elements.js</div>
                <div class="file-desc">All 21 components — Angular runtime included</div>
              </div>
            </div>
            <div class="file-row">
              <span class="file-icon">🎨</span>
              <div>
                <div class="file-name">node_modules/&#64;bhairab-patra/platform-ui/elements/styles.css</div>
                <div class="file-desc">Poppins font + CSS custom properties</div>
              </div>
            </div>
          </div>
        </section>

        <section id="html-page" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">3</span> Create your HTML page</h2>
          <p class="gs-p">Reference the files from <code>node_modules</code> — they will be served by the HTTP server in the next step:</p>
          <app-code lang="index.html" [id]="'html-full'" [text]="code.html.full" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="html-serve" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">4</span> Serve with HTTP server</h2>
          <p class="gs-p">Run this command from the folder that contains your <code>index.html</code> and <code>node_modules/</code>:</p>
          <app-code lang="bash" [id]="'html-serve'" [text]="code.html.serve" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="note note--success" style="margin-top:18px">
            Open <strong>http://localhost:4300</strong> in your browser. The shell, sidebar, and all components will load.
          </div>
        </section>

        <section id="html-events" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">5</span> Key rules for Plain HTML</h2>
          <div class="rules-list">
            <div class="rule-row">
              <span class="rule-badge rule-badge--ok">✓</span>
              <div><strong>String inputs</strong> → HTML attributes in kebab-case: <code>app-title="My App"</code></div>
            </div>
            <div class="rule-row">
              <span class="rule-badge rule-badge--ok">✓</span>
              <div><strong>Object / Array inputs</strong> → set as JS property after element is defined: <code>el.groups = [...]</code></div>
            </div>
            <div class="rule-row">
              <span class="rule-badge rule-badge--ok">✓</span>
              <div><strong>Events</strong> → native <code>addEventListener</code>: <code>el.addEventListener('itemSelect', fn)</code></div>
            </div>
            <div class="rule-row">
              <span class="rule-badge rule-badge--warn">✗</span>
              <div>Do <strong>not</strong> open <code>index.html</code> directly in the browser — always use an HTTP server</div>
            </div>
            <div class="rule-row">
              <span class="rule-badge rule-badge--warn">✗</span>
              <div>Do <strong>not</strong> set object inputs as HTML attributes — they will be treated as strings</div>
            </div>
          </div>
        </section>

      </ng-container>

      <!-- ── Input / Output quick reference (always visible) ── -->
      <section id="ref" class="gs-section">
        <h2 class="gs-h2">Input &amp; Output Quick Reference</h2>
        <div class="table-wrap">
          <table class="ref-table">
            <thead>
              <tr>
                <th>What</th>
                <th>Angular</th>
                <th>React 19</th>
                <th>Plain HTML</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>String input</td>
                <td><code>appTitle="My App"</code></td>
                <td><code>app-title="My App"</code></td>
                <td><code>app-title="My App"</code></td>
              </tr>
              <tr>
                <td>Number / boolean</td>
                <td><code>[count]="5"</code></td>
                <td><code>count="5"</code></td>
                <td><code>count="5"</code></td>
              </tr>
              <tr>
                <td>Object / Array</td>
                <td><code>[groups]="navGroups"</code></td>
                <td><code>ref.current.groups = data</code></td>
                <td><code>el.groups = data</code></td>
              </tr>
              <tr>
                <td>Output / Event</td>
                <td><code>(itemSelect)="onNav($event)"</code></td>
                <td><code>el.addEventListener('itemSelect', fn)</code></td>
                <td><code>el.addEventListener('itemSelect', fn)</code></td>
              </tr>
              <tr>
                <td>Content slot</td>
                <td><code>&lt;div logo&gt;…&lt;/div&gt;</code></td>
                <td><code>&lt;div slot="logo"&gt;…&lt;/div&gt;</code></td>
                <td><code>&lt;div slot="logo"&gt;…&lt;/div&gt;</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ── Next steps ── -->
      <section id="next" class="gs-section">
        <h2 class="gs-h2">Explore the Components</h2>
        <div class="next-grid">
          <a *ngFor="let n of nextSteps" [routerLink]="n.route" class="next-card">
            <span class="next-icon">{{ n.icon }}</span>
            <div>
              <div class="next-title">{{ n.title }}</div>
              <div class="next-desc">{{ n.desc }}</div>
            </div>
          </a>
        </div>
      </section>

    </article>

    <!-- ══ RIGHT PANEL ════════════════════════════════════════════ -->
    <aside class="otp">
      <div class="otp-label">ON THIS PAGE</div>
      <nav class="otp-nav">
        <a *ngFor="let s of currentSections"
           class="otp-link"
           [class.otp-link--active]="activeSection === s.id"
           (click)="scrollTo(s.id)">{{ s.label }}</a>
        <div class="otp-sep"></div>
        <a class="otp-link" (click)="scrollTo('ref')">Input / Output Ref</a>
        <a class="otp-link" (click)="scrollTo('next')">Explore Components</a>
      </nav>

      <div class="fw-mini-tabs">
        <div class="fw-mini-label">Switch framework</div>
        <button *ngFor="let fw of frameworks"
          class="fw-mini-btn"
          [class.fw-mini-btn--active]="active === fw.id"
          (click)="setFramework(fw.id)">{{ fw.label }}</button>
      </div>
    </aside>

  </div>
  `,
  styles: [`
    .gs-wrap {
      display: flex; align-items: flex-start;
      max-width: 1200px; margin: 0 auto;
      padding: 52px 40px 100px; gap: 64px;
    }
    .gs-content { flex: 1; min-width: 0; }

    .breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #9ca3af; margin-bottom: 18px; }
    .bc-sep { color: #d1d5db; }
    .bc-cur { color: #6b7280; }

    .gs-title { font-size: 36px; font-weight: 800; color: #111827; letter-spacing: -.025em; line-height: 1.15; margin-bottom: 14px; }
    .gs-lead  { font-size: 15.5px; color: #6b7280; line-height: 1.8; max-width: 680px; margin-bottom: 32px; }
    .gs-hr    { border: none; border-top: 1px solid #f3f4f6; margin: 36px 0; }

    .fw-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
    .fw-tab {
      display: flex; align-items: center; gap: 7px;
      padding: 8px 18px; border-radius: 10px;
      border: 1.5px solid #e5e7eb; background: #fff;
      font-size: 13.5px; font-weight: 500; color: #374151;
      cursor: pointer; font-family: inherit; transition: all .14s;
    }
    .fw-tab:hover { border-color: #12C6A8; color: #0d9e87; background: #f0fdfb; }
    .fw-tab--active { border-color: #12C6A8; background: #f0fdfb; color: #0d9e87; font-weight: 600; }
    .fw-tab__icon { width: 22px; height: 22px; flex-shrink: 0; display: flex; align-items: center; }
    .fw-tab__icon svg { width: 22px; height: 22px; display: block; }

    .fw-badge {
      display: inline-flex; align-items: center;
      padding: 4px 14px; border-radius: 999px;
      font-size: 12px; font-weight: 700; letter-spacing: .04em;
      text-transform: uppercase; margin-bottom: 28px;
    }
    .fw-badge--angular { background: #fce7e7; color: #c2001c; }
    .fw-badge--react   { background: #e0f2fe; color: #0369a1; }
    .fw-badge--html    { background: #f3f4f6; color: #374151; }

    .gs-section { margin-bottom: 52px; scroll-margin-top: 80px; }
    .gs-h2 {
      display: flex; align-items: center; gap: 12px;
      font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 14px;
    }
    .gs-h3 { font-size: 14.5px; font-weight: 600; color: #374151; margin-bottom: 10px; margin-top: 18px; }
    .gs-p  { font-size: 14px; color: #374151; line-height: 1.85; margin-bottom: 14px; }
    .gs-list { padding-left: 20px; margin-bottom: 18px; }
    .gs-list li { font-size: 14px; color: #374151; line-height: 1.9; }

    .step-badge {
      display: inline-flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border-radius: 50%;
      background: #12c6a8; color: #fff;
      font-size: 13px; font-weight: 700; flex-shrink: 0;
    }

    .note {
      display: flex; align-items: flex-start; gap: 10px;
      padding: 14px 18px; border-radius: 10px;
      font-size: 13.5px; line-height: 1.65; margin-bottom: 18px;
    }
    .note--info    { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; }
    .note--success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
    .note--warn    { background: #fffbeb; border: 1px solid #fde68a; color: #92400e; }

    .file-list { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; }
    .file-row  { display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: 10px; background: #f9fafb; border: 1px solid #e5e7eb; }
    .file-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
    .file-name { font-family: 'Fira Code','Cascadia Code', monospace; font-size: 13px; color: #0ea5e9; margin-bottom: 4px; }
    .file-desc { font-size: 12.5px; color: #6b7280; }

    .rules-list { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
    .rule-row { display: flex; align-items: flex-start; gap: 12px; font-size: 13.5px; color: #374151; line-height: 1.6; }
    .rule-badge {
      display: inline-flex; align-items: center; justify-content: center;
      width: 22px; height: 22px; border-radius: 50%;
      font-size: 12px; font-weight: 700; flex-shrink: 0; margin-top: 1px;
    }
    .rule-badge--ok   { background: #d1fae5; color: #065f46; }
    .rule-badge--warn { background: #fee2e2; color: #991b1b; }

    .table-wrap { overflow-x: auto; }
    .ref-table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 560px; }
    .ref-table th {
      text-align: left; padding: 10px 14px;
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .06em; color: #6b7280;
      border-bottom: 2px solid #e5e7eb; background: #f9fafb;
    }
    .ref-table td { padding: 10px 14px; border-bottom: 1px solid #f3f4f6; color: #374151; vertical-align: top; }
    .ref-table td:first-child { font-weight: 600; color: #111827; }
    .ref-table tr:last-child td { border-bottom: none; }
    .ref-table tr:hover td { background: #fafafa; }

    .next-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(220px,1fr)); gap: 14px; margin-top: 8px; }
    .next-card {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 18px 20px; border-radius: 12px;
      border: 1px solid #e5e7eb; background: #fff;
      text-decoration: none; color: inherit;
      transition: border-color .15s, box-shadow .15s;
    }
    .next-card:hover { border-color: #93c5fd; box-shadow: 0 2px 12px rgba(37,99,235,.08); }
    .next-icon  { font-size: 22px; flex-shrink: 0; }
    .next-title { font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 3px; }
    .next-desc  { font-size: 12px; color: #6b7280; line-height: 1.5; }

    .otp { width: 200px; flex-shrink: 0; position: sticky; top: 88px; align-self: flex-start; }
    .otp-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .09em; color: #9ca3af; margin-bottom: 10px; }
    .otp-nav   { display: flex; flex-direction: column; gap: 1px; margin-bottom: 4px; }
    .otp-sep   { height: 1px; background: #f3f4f6; margin: 8px 0; }
    .otp-link  {
      font-size: 13px; color: #6b7280;
      padding: 4px 0 4px 12px;
      border-left: 2px solid transparent;
      text-decoration: none; cursor: pointer; display: block;
      user-select: none; transition: color .12s, border-color .12s;
    }
    .otp-link:hover { color: #111827; }
    .otp-link--active { color: #0fa78d; border-left-color: #12C6A8; font-weight: 500; }

    .fw-mini-tabs  { margin-top: 28px; border-top: 1px solid #f3f4f6; padding-top: 16px; }
    .fw-mini-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .09em; color: #9ca3af; margin-bottom: 8px; }
    .fw-mini-btn   {
      display: block; width: 100%; text-align: left;
      padding: 5px 10px; border-radius: 6px; border: none;
      background: transparent; font-size: 12.5px; color: #6b7280;
      cursor: pointer; font-family: inherit; margin-bottom: 2px; transition: background .12s, color .12s;
    }
    .fw-mini-btn:hover { background: #f9fafb; color: #111827; }
    .fw-mini-btn--active { background: #f0fdfb; color: #0d9e87; font-weight: 600; }
  `],
})
export class GettingStartedComponent implements OnInit {
  copied       = '';
  active: Framework = 'angular';
  activeSection = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    const url = this.router.url;
    if (url.includes('/react'))   this.active = 'react';
    else if (url.includes('/html')) this.active = 'html';
    else                            this.active = 'angular';
    this.cdr.markForCheck();
  }

  frameworks: { id: Framework; label: string; icon: SafeHtml }[] = [
    {
      id: 'angular',
      label: 'Angular',
      icon: this.sanitizer.bypassSecurityTrustHtml(
        `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
          <path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 22.256l9.596-3.503L23.32 3.982 11.999.0zm7.064 18.31h-2.638l-1.422-3.503H8.996L7.574 18.31H4.936L12 3.405z" fill="#c3002f"/>
        </svg>`
      ),
    },
    {
      id: 'react',
      label: 'React',
      icon: this.sanitizer.bypassSecurityTrustHtml(
        `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
          <circle cx="12" cy="12" r="2.05" fill="#61dafb"/>
          <ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25"/>
          <ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10.5" ry="3.9" fill="none" stroke="#61dafb" stroke-width="1.25" transform="rotate(120 12 12)"/>
        </svg>`
      ),
    },
    {
      id: 'html',
      label: 'Plain HTML',
      icon: this.sanitizer.bypassSecurityTrustHtml(
        `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#e34c26"/>
        </svg>`
      ),
    },
  ];

  get currentSections() {
    return this.sectionMap[this.active] || [];
  }

  sectionMap: Record<Framework, { id: string; label: string }[]> = {
    angular: [
      { id: 'ng-prereq',  label: 'Prerequisites'     },
      { id: 'ng-npmrc',   label: '.npmrc Setup'       },
      { id: 'ng-install', label: 'Install'            },
      { id: 'ng-styles',  label: 'Global Styles'      },
      { id: 'ng-import',  label: 'Import Components'  },
      { id: 'ng-use',     label: 'App Shell Example'  },
      { id: 'ng-verify',  label: 'Run & Verify'       },
    ],
    react: [
      { id: 'rx-prereq',    label: 'Prerequisites'    },
      { id: 'rx-create',    label: 'Create App'       },
      { id: 'rx-npmrc',     label: '.npmrc Setup'     },
      { id: 'rx-install',   label: 'Install'          },
      { id: 'rx-bootstrap', label: 'Bootstrap'        },
      { id: 'rx-types',     label: 'TypeScript Types' },
      { id: 'rx-use',       label: 'App Shell Example'},
      { id: 'rx-events',    label: 'Events'           },
      { id: 'rx-verify',    label: 'Run & Verify'     },
    ],
    html: [
      { id: 'html-npmrc',   label: '.npmrc Setup'    },
      { id: 'html-install', label: 'Install'         },
      { id: 'html-page',    label: 'Create HTML page'},
      { id: 'html-serve',   label: 'Serve with HTTP' },
      { id: 'html-events',  label: 'Key Rules'       },
    ],
  };

  nextSteps = [
    { icon: '🧩', title: 'App Shell',  desc: 'Full layout shell with sidebar + header', route: '/app-shell' },
    { icon: '📌', title: 'Header',     desc: 'Top bar with nav, avatar, badge',          route: '/header'    },
    { icon: '🗂️', title: 'Sidebar',    desc: 'Collapsible nav rail with groups',         route: '/sidebar'   },
    { icon: '🔘', title: 'Button',     desc: 'Variants, sizes, loading state',           route: '/button'    },
    { icon: '🃏', title: 'Card',       desc: 'Stat cards and content layouts',           route: '/card'      },
    { icon: '💬', title: 'Modal',      desc: 'Dialog overlays and confirmations',        route: '/modal'     },
    { icon: '🏷️', title: 'Badge',      desc: 'Status labels and indicators',             route: '/badge'     },
    { icon: '📋', title: 'Forms',      desc: 'Input, Select, Checkbox, Switch…',         route: '/input'     },
  ];

  setFramework(fw: Framework): void {
    this.router.navigate(['/getting-started', fw]);
  }

  scrollTo(id: string): void {
    this.activeSection = id;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.cdr.markForCheck();
  }

  doCopy(text: string, id: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => { this.copied = ''; this.cdr.markForCheck(); }, 2000);
    });
  }

  // ── CODE SNIPPETS ─────────────────────────────────────────────
  code = {

    // ─ Angular ─────────────────────────────────────────────────
    ng: {
      npmrc:
`//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT_HERE
@bhairab-patra:registry=https://npm.pkg.github.com`,

      install: `npm install @bhairab-patra/platform-ui`,

      federation:
`// federation.config.js
skip: [
  'rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket',
  '@bhairab-patra/platform-ui',   // ← add this line
],`,

      styles:
`// angular.json  — add to "styles" array
"styles": [
  "node_modules/@bhairab-patra/platform-ui/elements/styles.css",
  "src/styles.css"
]`,

      standalone:
`// app.component.ts  (or any standalone component)
import {
  PuiButtonComponent,
  PuiCardComponent,
  PuiBadgeComponent,
  PuiAppShellComponent,
} from '@bhairab-patra/platform-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PuiAppShellComponent,
    PuiButtonComponent,
    PuiCardComponent,
    PuiBadgeComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {}`,

      ngModule:
`// app.module.ts  (NgModule-based app)
import {
  PuiButtonComponent,
  PuiCardComponent,
  PuiAppShellComponent,
} from '@bhairab-patra/platform-ui';

@NgModule({
  imports: [
    BrowserModule,
    PuiAppShellComponent,
    PuiButtonComponent,
    PuiCardComponent,
  ],
  declarations: [AppComponent],
  bootstrap:    [AppComponent],
})
export class AppModule {}`,

      shell:
`// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  PuiAppShellComponent,
} from '@bhairab-patra/platform-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PuiAppShellComponent, RouterOutlet],
  template: \`
    <pui-app-shell
      appTitle="Admin Portal"
      appSubtitle="v2.0"
      headerBgColor="#12C6A8"
      headerUserName="Jane Doe"
      headerUserEmail="jane@example.com"
      [headerMenuItems]="menu"
      [groups]="nav"
      [activeId]="activeId"
      (itemSelect)="onNav($event.id)"
      style="height:100vh;display:block">

      <router-outlet />

    </pui-app-shell>
  \`,
})
export class AppComponent {
  activeId = 'dashboard';

  menu = [
    { label: 'Profile',  action: 'profile' },
    { label: 'Sign Out', action: 'logout', danger: true },
  ];

  nav = [
    {
      id: 'grp-main', label: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'reports',   label: 'Reports'   },
        { id: 'users',     label: 'Users', badge: 12 },
      ],
    },
    {
      id: 'grp-settings', label: 'Settings',
      items: [
        { id: 'settings', label: 'General' },
        { id: 'billing',  label: 'Billing'  },
      ],
    },
  ];

  onNav(id: string) { this.activeId = id; }
}`,
    },

    // ─ React ───────────────────────────────────────────────────
    react: {
      create:
`npm create vite@latest my-app -- --template react-ts
cd my-app
npm install`,

      npmrc:
`//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT_HERE
@bhairab-patra:registry=https://npm.pkg.github.com`,

      install: `npm install @bhairab-patra/platform-ui`,

      main:
`// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Register all pui-* web components before React renders
import '@bhairab-patra/platform-ui/elements';
import '@bhairab-patra/platform-ui/elements/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,

      types:
`// src/pui.d.ts
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type PuiProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
  & Record<string, any>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'pui-app-shell':      PuiProps;
      'pui-header':         PuiProps;
      'pui-sidebar':        PuiProps;
      'pui-button':         PuiProps;
      'pui-badge':          PuiProps;
      'pui-card':           PuiProps;
      'pui-modal':          PuiProps;
      'pui-input':          PuiProps;
      'pui-select':         PuiProps;
      'pui-checkbox':       PuiProps;
      'pui-radio':          PuiProps;
      'pui-textarea':       PuiProps;
      'pui-switch':         PuiProps;
      'pui-spinner':        PuiProps;
      'pui-breadcrumb':     PuiProps;
      'pui-icon':           PuiProps;
      'pui-tooltip':        PuiProps;
      'pui-toast-container':PuiProps;
      'pui-search':         PuiProps;
      'pui-filter-panel':   PuiProps;
    }
  }
}`,

      tsconfig:
`// tsconfig.json  — add pui.d.ts to include array
{
  "include": ["src", "src/pui.d.ts"]
}`,

      app:
`// src/App.tsx
import { useRef, useEffect } from 'react';

const NAV_GROUPS = [
  {
    id: 'grp-main', label: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'reports',   label: 'Reports'   },
      { id: 'users',     label: 'Users', badge: 12 },
    ],
  },
  {
    id: 'grp-settings', label: 'Settings',
    items: [
      { id: 'settings', label: 'General' },
    ],
  },
];

const MENU_ITEMS = [
  { label: 'My Profile', action: 'profile' },
  { label: 'Sign Out',   action: 'logout', danger: true },
];

export default function App() {
  const shellRef = useRef<any>(null);

  // Object inputs must be set as DOM properties via a ref
  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    el.groups          = NAV_GROUPS;
    el.headerMenuItems = MENU_ITEMS;
    el.headerBadge     = { text: 'PROD', color: '#10b981', textColor: '#fff' };
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <pui-app-shell
        ref={shellRef}
        app-title="React App"
        app-subtitle="Powered by Platform UI"
        header-bg-color="#12C6A8"
        header-user-name="Jane Doe"
        header-user-email="jane@example.com"
        active-id="dashboard"
        style={{ height: '100%', display: 'block' }}>

        <div style={{ padding: '32px' }}>
          <h1>Dashboard</h1>
          <p>Content rendered inside Platform UI shell from React.</p>
          <pui-button variant="primary">Get Started</pui-button>
          <pui-badge variant="success" style={{ marginLeft: '12px' }}>Live</pui-badge>
        </div>

      </pui-app-shell>
    </div>
  );
}`,

      events:
`// src/App.tsx — event handling via addEventListener + ref
import { useRef, useEffect, useState } from 'react';

export default function App() {
  const shellRef = useRef<any>(null);
  const [activeId, setActiveId] = useState('dashboard');

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;

    const onNav = (e: CustomEvent) => setActiveId(e.detail.id);
    const onMenu = (e: CustomEvent) => {
      if (e.detail === 'logout') console.log('Signing out…');
    };

    el.addEventListener('itemSelect',       onNav);
    el.addEventListener('headerMenuAction', onMenu);

    return () => {
      el.removeEventListener('itemSelect',       onNav);
      el.removeEventListener('headerMenuAction', onMenu);
    };
  }, []);

  return (
    <pui-app-shell
      ref={shellRef}
      app-title="React App"
      active-id={activeId}
      style={{ height: '100vh', display: 'block' }}>
      <p style={{ padding: 32 }}>Active page: <strong>{activeId}</strong></p>
    </pui-app-shell>
  );
}`,
    },

    // ─ Plain HTML ───────────────────────────────────────────────
    html: {
      npmrc:
`//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT_HERE
@bhairab-patra:registry=https://npm.pkg.github.com`,

      install:
`# Initialise package.json (only needed once)
npm init -y

# Install the library
npm install @bhairab-patra/platform-ui`,

      full:
`<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App — Platform UI</title>

  <!-- 1. Styles (Poppins font + CSS variables) -->
  <link rel="stylesheet"
        href="node_modules/@bhairab-patra/platform-ui/elements/styles.css">

  <!-- 2. Web Components bundle (registers all pui-* elements) -->
  <script src="node_modules/@bhairab-patra/platform-ui/elements/pui-elements.js"
          defer></script>

  <style>
    html, body { height: 100%; margin: 0; }
    .content   { padding: 32px; }
    .cards     { display: grid; grid-template-columns: repeat(auto-fill,minmax(180px,1fr)); gap: 16px; margin-top: 24px; }
  </style>
</head>
<body>

  <pui-app-shell
    id="shell"
    app-title="Admin Portal"
    app-subtitle="v2.0"
    header-bg-color="#12C6A8"
    header-user-name="Jane Doe"
    header-user-email="jane@company.com"
    style="height:100%;display:block">

    <div class="content">
      <h2>Dashboard</h2>
      <p>Active page: <strong id="activePage">dashboard</strong></p>

      <div class="cards">
        <pui-card id="card1"></pui-card>
        <pui-card id="card2"></pui-card>
        <pui-card id="card3"></pui-card>
      </div>

      <div style="margin-top:24px;display:flex;align-items:center;gap:12px">
        <pui-button id="saveBtn" variant="primary">Save Changes</pui-button>
        <pui-badge variant="success">Live</pui-badge>
      </div>
    </div>

  </pui-app-shell>

  <script>
    /* ── App Shell: set object inputs after element is defined ── */
    customElements.whenDefined('pui-app-shell').then(() => {
      const shell = document.getElementById('shell');

      shell.groups = [
        {
          id: 'grp-overview', label: 'Overview',
          items: [
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'analytics', label: 'Analytics', badge: 'New', badgeVariant: 'success' },
          ],
        },
        {
          id: 'grp-manage', label: 'Management',
          items: [
            { id: 'users',    label: 'Users',    badge: 12 },
            { id: 'products', label: 'Products'            },
            { id: 'orders',   label: 'Orders',   badge: 3, badgeVariant: 'warning' },
          ],
        },
      ];

      shell.headerMenuItems = [
        { label: 'Profile',  action: 'profile' },
        { label: 'Sign Out', action: 'logout', danger: true },
      ];

      shell.headerBadge = { text: 'PROD', color: '#10b981', textColor: '#fff' };

      shell.addEventListener('itemSelect', (e) => {
        document.getElementById('activePage').textContent = e.detail.id;
      });

      shell.addEventListener('headerMenuAction', (e) => {
        if (e.detail === 'logout') alert('Signing out…');
      });
    });

    /* ── Stat cards ── */
    customElements.whenDefined('pui-card').then(() => {
      document.getElementById('card1').data = { title: 'Users',   value: '1,284', trend: 'up',   trendValue: '+8%',  subtitle: 'this month'  };
      document.getElementById('card2').data = { title: 'Revenue', value: '$48.2k',trend: 'up',   trendValue: '+12%', subtitle: 'vs last month'};
      document.getElementById('card3').data = { title: 'Tickets', value: '342',   trend: 'down', trendValue: '-5%',  subtitle: 'vs last week' };
    });

    /* ── Button ── */
    customElements.whenDefined('pui-button').then(() => {
      document.getElementById('saveBtn').addEventListener('buttonClick', () => {
        alert('Changes saved!');
      });
    });
  </script>

</body>
</html>`,

      serve: `npx http-server . -p 4300 --cors -o index.html`,
    },
  };
}

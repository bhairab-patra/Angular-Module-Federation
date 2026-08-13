import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CodeBlockComponent } from '../../shared/code-block.component';

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

        <!-- ── MODE TOGGLE ── -->
        <div class="mode-toggle">
          <button class="mode-btn" [class.mode-btn--active]="ngMode==='published'" (click)="ngMode='published'">
            📦 Published npm (production)
          </button>
          <button class="mode-btn" [class.mode-btn--active]="ngMode==='local'" (click)="ngMode='local'">
            🔧 Local Dev (without publishing)
          </button>
        </div>

        <!-- ════════════════════════ PUBLISHED NPM ════════════════════════ -->
        <ng-container *ngIf="ngMode==='published'">

        <section id="ng-prereq" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">1</span> Prerequisites</h2>
          <ul class="gs-list">
            <li>Node.js 18+ and npm 9+</li>
            <li>Angular CLI 19+&nbsp;&nbsp;<code>npm install -g &#64;angular/cli</code></li>
            <li>An Angular 19 project — standalone or NgModule both work</li>
            <li>A GitHub Personal Access Token with <code>read:packages</code> scope</li>
          </ul>
          <div class="note note--info">
            Platform UI uses <strong>Angular 19 standalone components</strong> internally.
            NgModule apps still work — just import each component inside your <code>imports</code> array.
          </div>
        </section>

        <section id="ng-npmrc" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">2</span> Configure npm for GitHub Packages</h2>
          <p class="gs-p">Create <code>.npmrc</code> in your project root and paste the two lines below. Replace <code>YOUR_GITHUB_PAT_HERE</code> with your token:</p>
          <app-code lang=".npmrc" [id]="'ng-npmrc'" [text]="code.ng.npmrc" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="note note--warn">
            Add <code>.npmrc</code> to <code>.gitignore</code> — never commit a token to source control.
          </div>
        </section>

        <section id="ng-install" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">3</span> Install the Library</h2>
          <app-code lang="bash" [id]="'ng-install'" [text]="code.ng.install" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>

          <h3 class="gs-h3" style="margin-top:24px">Using Module Federation?</h3>
          <p class="gs-p">Add the package to the <code>skip</code> list so Native Federation does not try to re-bundle it:</p>
          <app-code lang="federation.config.js" [id]="'ng-fed'" [text]="code.ng.federation" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="ng-styles" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">4</span> Add Global Styles</h2>
          <p class="gs-p">Open <code>angular.json</code> and add the library stylesheet to the <code>"styles"</code> array. This loads the Poppins font and all CSS custom properties:</p>
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
          <p class="gs-p">Drop <code>pui-lib-app-shell</code> into your root component and you get a full layout — collapsible sidebar, header with user menu, and a slot for your router outlet — in a single tag:</p>
          <app-code lang="app.component.ts" [id]="'ng-shell'" [text]="code.ng.shell" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="ng-verify" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">7</span> Run &amp; Verify</h2>
          <app-code lang="bash" [id]="'ng-serve'" [text]="'ng serve'" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="note note--success" style="margin-top:18px">
            Open <strong>http://localhost:4200</strong>. You should see the teal header, sidebar rail, and hamburger toggle.
          </div>
        </section>

        </ng-container><!-- end published -->

        <!-- ════════════════════════ LOCAL DEV ════════════════════════ -->
        <ng-container *ngIf="ngMode==='local'">

        <div class="note note--info" style="margin-bottom:28px">
          Use this when you are actively developing the library and want a consumer app to
          pick up changes instantly — <strong>no publish step required</strong>.
          The mechanism is <code>npm link</code> + a symlink from the consumer's
          <code>node_modules</code> to the library's local <code>dist/</code> folder.
        </div>

        <section id="ng-local-prereq" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">1</span> Prerequisites</h2>
          <ul class="gs-list">
            <li>Node.js 18+ and npm 9+</li>
            <li>Angular CLI 19+&nbsp;&nbsp;<code>npm install -g &#64;angular/cli</code></li>
            <li>The <strong>platform-ui library source</strong> cloned locally</li>
            <li>Your Angular consumer app cloned locally</li>
          </ul>
        </section>

        <section id="ng-local-build" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">2</span> Build the Library</h2>
          <p class="gs-p">Run this inside the <strong>library repo</strong>. This produces the compiled output in <code>dist/platform-ui/</code>:</p>
          <app-code lang="bash" [id]="'ng-local-build'" [text]="code.ng.localBuild" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="note note--info">
            Using <code>--configuration development</code> skips the lint step so the build is faster. Never use <code>npm run build:local</code> — it runs lint first and may block.
          </div>
        </section>

        <section id="ng-local-link1" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">3</span> Register the dist Folder Globally</h2>
          <p class="gs-p">Navigate into the <strong>built output folder</strong> and run <code>npm link</code>. This registers <code>&#64;bhairab-patra/platform-ui</code> globally on your machine:</p>
          <app-code lang="bash" [id]="'ng-local-link1'" [text]="code.ng.localLink1" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <p class="gs-p" style="margin-top:10px">Do this <strong>once per machine</strong> (or after a fresh clone). You do not need to repeat it every rebuild.</p>
        </section>

        <section id="ng-local-link2" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">4</span> Link the Consumer App</h2>
          <p class="gs-p">Inside your <strong>Angular consumer app</strong>, link it to the globally registered dist:</p>
          <app-code lang="bash" [id]="'ng-local-link2'" [text]="code.ng.localLink2" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="note note--warn">
            If you run <code>npm install</code> in the consumer later, it will overwrite this symlink.
            Just run the link command again to restore it.
          </div>
        </section>

        <section id="ng-local-syms" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">5</span> Add preserveSymlinks to angular.json</h2>
          <p class="gs-p">Without this, Angular loads two separate copies of <code>&#64;angular/core</code> — one from the library's own <code>node_modules</code> and one from the consumer's. This causes <code>lView</code> errors and injection failures at runtime. Open <code>angular.json</code> and add one line:</p>
          <app-code lang="angular.json" [id]="'ng-local-syms'" [text]="code.ng.preserveSymlinks" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="ng-local-styles" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">6</span> Add Global Styles</h2>
          <p class="gs-p">Add the library stylesheet to the <code>"styles"</code> array in <code>angular.json</code>:</p>
          <app-code lang="angular.json" [id]="'ng-local-styles'" [text]="code.ng.stylesLocal" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="ng-local-import" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">7</span> Import &amp; Use Components</h2>
          <p class="gs-p">Import exactly the same way as the published flow — the symlink makes npm think it is the real package:</p>
          <app-code lang="TypeScript" [id]="'ng-local-import'" [text]="code.ng.standalone" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="ng-local-serve" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">8</span> Start the App</h2>
          <app-code lang="bash" [id]="'ng-local-serve'" [text]="code.ng.localServe" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="note note--success" style="margin-top:18px">
            Open <strong>http://localhost:4200</strong>. Every time you rebuild the library, refresh the browser — no re-link needed.
          </div>
        </section>

        <section id="ng-local-daily" class="gs-section">
          <h2 class="gs-h2">Day-to-Day: Rebuild on Every Library Change</h2>
          <p class="gs-p">After changing any library source file, rebuild and refresh:</p>
          <app-code lang="bash" [id]="'ng-local-daily'" [text]="code.ng.localDaily" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <h3 class="gs-h3" style="margin-top:20px">Or watch mode — rebuilds automatically on every save:</h3>
          <app-code lang="bash" [id]="'ng-local-watch'" [text]="code.ng.localWatch" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="ng-local-blockers" class="gs-section">
          <h2 class="gs-h2">Common Blockers &amp; Fixes</h2>

          <div class="blocker-list">

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;<code>lView[15] null</code> or injection errors at startup</div>
              <div class="blocker-body">
                <strong>Cause:</strong> Angular loaded two copies of <code>&#64;angular/core</code> through the symlink.<br>
                <strong>Fix:</strong> Make sure <code>"preserveSymlinks": true</code> is in <code>angular.json</code> (Step 5). Then clear the cache:
                <app-code lang="bash" [id]="'ng-fix-lview'" [text]="code.ng.clearCache" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:10px"></app-code>
              </div>
            </div>

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;Stale output — old component version still shows after rebuild</div>
              <div class="blocker-body">
                <strong>Cause:</strong> Angular compiler cache is holding the old build.<br>
                <strong>Fix:</strong> Delete the cache and restart. Use <code>rm -rf</code> in Git Bash — <code>rmdir /s /q</code> does not work in Git Bash.
                <app-code lang="bash (Git Bash)" [id]="'ng-fix-cache'" [text]="code.ng.clearCache" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:10px"></app-code>
              </div>
            </div>

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;Cannot find module <code>&#64;bhairab-patra/platform-ui</code></div>
              <div class="blocker-body">
                <strong>Cause:</strong> <code>npm install</code> ran after <code>npm link</code> and overwrote the symlink.<br>
                <strong>Fix:</strong> Re-run the link command in the consumer app:
                <app-code lang="bash" [id]="'ng-fix-nomod'" [text]="code.ng.localLink2" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:10px"></app-code>
              </div>
            </div>

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;Build fails — lint errors block the build</div>
              <div class="blocker-body">
                <strong>Cause:</strong> <code>npm run build:local</code> runs lint before compiling.<br>
                <strong>Fix:</strong> Use <code>ng build</code> directly — it skips lint:
                <app-code lang="bash" [id]="'ng-fix-lint'" [text]="code.ng.localBuild" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:10px"></app-code>
              </div>
            </div>

          </div>
        </section>

        </ng-container><!-- end local dev -->

      </ng-container>

      <!-- ╔══════════════════════════════════════════════════════╗ -->
      <!-- ║  REACT                                               ║ -->
      <!-- ╚══════════════════════════════════════════════════════╝ -->
      <ng-container *ngIf="active === 'react'">

        <div class="fw-badge fw-badge--react">React 19</div>

        <!-- ── MODE TOGGLE ── -->
        <div class="mode-toggle">
          <button class="mode-btn" [class.mode-btn--active]="rxMode==='published'" (click)="rxMode='published'">
            📦 Published npm (production)
          </button>
          <button class="mode-btn" [class.mode-btn--active]="rxMode==='local'" (click)="rxMode='local'">
            🔧 Local Dev (without publishing)
          </button>
        </div>

        <!-- ════════════════════════ PUBLISHED NPM ════════════════════════ -->
        <ng-container *ngIf="rxMode==='published'">

        <section id="rx-prereq" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">1</span> Prerequisites</h2>
          <ul class="gs-list">
            <li>Node.js 18+ and npm 9+</li>
            <li>A React 18 / 19 project — Vite is recommended</li>
            <li>A GitHub Personal Access Token with <code>read:packages</code> scope</li>
          </ul>
          <div class="note note--info">
            Platform UI exposes components as <strong>Angular Elements</strong> (standard Web Components).
            React 19 supports custom elements natively — no wrapper needed.
            Object and array inputs must be set as <strong>DOM properties</strong> via a <code>ref</code>, not as HTML attributes.
          </div>
        </section>

        <section id="rx-create" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">2</span> Create a React + Vite App (skip if existing)</h2>
          <app-code lang="bash" [id]="'rx-create'" [text]="code.react.create" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="rx-npmrc" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">3</span> Configure npm for GitHub Packages</h2>
          <p class="gs-p">Create <code>.npmrc</code> in your project root and replace the token:</p>
          <app-code lang=".npmrc" [id]="'rx-npmrc'" [text]="code.react.npmrc" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="note note--warn">Add <code>.npmrc</code> to <code>.gitignore</code> — never commit a token.</div>
        </section>

        <section id="rx-install" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">4</span> Install the Library</h2>
          <app-code lang="bash" [id]="'rx-install'" [text]="code.react.install" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <p class="gs-p" style="margin-top:12px">After install, two files inside the package are used by React:</p>
          <div class="file-list">
            <div class="file-row">
              <span class="file-icon">📄</span>
              <div>
                <div class="file-name">node_modules/&#64;bhairab-patra/platform-ui/elements/pui-elements.js</div>
                <div class="file-desc">All components as Web Components — Angular runtime bundled inside</div>
              </div>
            </div>
            <div class="file-row">
              <span class="file-icon">🎨</span>
              <div>
                <div class="file-name">node_modules/&#64;bhairab-patra/platform-ui/elements/styles.css</div>
                <div class="file-desc">Poppins font + all CSS custom properties / design tokens</div>
              </div>
            </div>
          </div>
        </section>

        <section id="rx-bootstrap" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">5</span> Bootstrap Web Components</h2>
          <p class="gs-p">Import the elements bundle once at the top of <code>src/main.tsx</code>. This registers all <code>pui-*</code> custom elements with the browser before React renders anything:</p>
          <app-code lang="src/main.tsx" [id]="'rx-main'" [text]="code.react.main" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="rx-types" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">6</span> Add TypeScript Declarations</h2>
          <p class="gs-p">Create <code>src/pui.d.ts</code> so TypeScript recognises all <code>pui-*</code> tags in JSX without errors:</p>
          <app-code lang="src/pui.d.ts" [id]="'rx-types'" [text]="code.react.types" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <p class="gs-p" style="margin-top:14px">Then reference it in <code>tsconfig.json</code>:</p>
          <app-code lang="tsconfig.json" [id]="'rx-tsref'" [text]="code.react.tsconfig" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="rx-use" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">7</span> Full App Shell Example</h2>
          <p class="gs-p">
            <strong>String inputs</strong> → kebab-case HTML attributes (<code>app-title="My App"</code>).<br>
            <strong>Object / Array inputs</strong> → must be set as DOM properties via a <code>ref</code> — never as HTML attributes.
          </p>
          <app-code lang="src/App.tsx" [id]="'rx-app'" [text]="code.react.app" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="rx-events" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">8</span> Handling Events</h2>
          <p class="gs-p">All outputs are native <code>CustomEvent</code>s — use <code>addEventListener</code> via a <code>ref</code> in a <code>useEffect</code>:</p>
          <app-code lang="src/App.tsx" [id]="'rx-events'" [text]="code.react.events" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="rx-verify" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">9</span> Run &amp; Verify</h2>
          <app-code lang="bash" [id]="'rx-serve'" [text]="'npm run dev'" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="note note--success" style="margin-top:18px">
            Open <strong>http://localhost:5173</strong>. You should see the full Platform UI shell — header, sidebar, and your React content — rendered inside the browser.
          </div>
        </section>

        </ng-container><!-- end published -->

        <!-- ════════════════════════ LOCAL DEV ════════════════════════ -->
        <ng-container *ngIf="rxMode==='local'">

        <div class="note note--info" style="margin-bottom:28px">
          Use this when you are actively developing the library and want the React app to
          pick up changes instantly — <strong>no publish step required</strong>.
          React uses a <strong>Vite alias</strong> pointing directly at the library's
          <code>dist/</code> folder, plus a dev-server middleware that serves
          <code>pui-elements.js</code> from <code>dist/elements/</code>.
          No <code>npm link</code> is needed for React.
        </div>

        <section id="rx-local-prereq" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">1</span> Prerequisites</h2>
          <ul class="gs-list">
            <li>Node.js 18+ and npm 9+</li>
            <li>A React + Vite project</li>
            <li>The <strong>platform-ui library source</strong> cloned locally</li>
            <li>Angular CLI 19+ installed globally (needed to build the library)</li>
          </ul>
        </section>

        <section id="rx-local-build" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">2</span> Build the Library and Elements Bundle</h2>
          <p class="gs-p">Run both commands inside the <strong>library repo</strong>. You need both outputs — the library itself and the web components bundle:</p>
          <app-code lang="bash" [id]="'rx-local-build'" [text]="code.react.localBuild" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="file-list" style="margin-top:14px">
            <div class="file-row">
              <span class="file-icon">📁</span>
              <div>
                <div class="file-name">dist/platform-ui/</div>
                <div class="file-desc">Angular component library — used by Vite alias for types and imports</div>
              </div>
            </div>
            <div class="file-row">
              <span class="file-icon">📄</span>
              <div>
                <div class="file-name">dist/elements/pui-elements.js</div>
                <div class="file-desc">Web components bundle — what the React app actually loads in the browser</div>
              </div>
            </div>
          </div>
        </section>

        <section id="rx-local-vite" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">3</span> Configure vite.config.js</h2>
          <p class="gs-p">Add a resolve alias so imports from <code>&#64;bhairab-patra/platform-ui</code> resolve directly to the local dist folder. Also add a middleware plugin so Vite serves <code>pui-elements.js</code> from <code>dist/elements/</code> at dev time:</p>
          <app-code lang="vite.config.js" [id]="'rx-local-vite'" [text]="code.react.localVite" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="rx-local-html" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">4</span> Load Elements Bundle in index.html</h2>
          <p class="gs-p">Add this script tag inside <code>&lt;head&gt;</code> of <code>index.html</code>. Vite's middleware serves it from <code>dist/elements/</code>:</p>
          <app-code lang="index.html" [id]="'rx-local-html'" [text]="code.react.localHtml" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="rx-local-types" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">5</span> Add TypeScript Declarations</h2>
          <p class="gs-p">Create <code>src/pui.d.ts</code> so TypeScript recognises all <code>pui-*</code> JSX tags:</p>
          <app-code lang="src/pui.d.ts" [id]="'rx-local-types'" [text]="code.react.types" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <p class="gs-p" style="margin-top:14px">Add it to <code>tsconfig.json</code>:</p>
          <app-code lang="tsconfig.json" [id]="'rx-local-tsref'" [text]="code.react.tsconfig" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="rx-local-use" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">6</span> Use Components — Same as Published Flow</h2>
          <p class="gs-p">The usage is identical to the published flow. String inputs as kebab-case attributes; objects/arrays via a <code>ref</code>:</p>
          <app-code lang="src/App.tsx" [id]="'rx-local-use'" [text]="code.react.app" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
        </section>

        <section id="rx-local-serve" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">7</span> Start the React App</h2>
          <app-code lang="bash" [id]="'rx-local-serve'" [text]="'npm run dev'" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="note note--success" style="margin-top:18px">
            Open <strong>http://localhost:5173</strong>. Vite serves the elements bundle live from <code>dist/elements/</code>.
          </div>
        </section>

        <section id="rx-local-daily" class="gs-section">
          <h2 class="gs-h2">Day-to-Day: Rebuild on Every Library Change</h2>
          <p class="gs-p">After changing any library source file, run both builds then refresh the browser:</p>
          <app-code lang="bash" [id]="'rx-local-daily'" [text]="code.react.localBuild" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></app-code>
          <div class="note note--info" style="margin-top:14px">
            Both builds are needed every time — the elements bundle wraps the library output.
            If you only rebuild the library without rebuilding elements, the browser still runs the old bundle.
          </div>
        </section>

        <section id="rx-local-blockers" class="gs-section">
          <h2 class="gs-h2">Common Blockers &amp; Fixes</h2>

          <div class="blocker-list">

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;<code>pui-elements.js</code> returns 404</div>
              <div class="blocker-body">
                <strong>Cause:</strong> The elements bundle has not been built yet, or <code>dist/elements/</code> does not exist.<br>
                <strong>Fix:</strong> Run the elements build:
                <app-code lang="bash" [id]="'rx-fix-404'" [text]="code.react.localElementsBuild" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:10px"></app-code>
              </div>
            </div>

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;Components not updating after library rebuild</div>
              <div class="blocker-body">
                <strong>Cause:</strong> Only the library was rebuilt — the elements bundle still contains the old code.<br>
                <strong>Fix:</strong> Always rebuild <em>both</em> after a change:
                <app-code lang="bash" [id]="'rx-fix-stale'" [text]="code.react.localBuild" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:10px"></app-code>
              </div>
            </div>

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;Vite crashes with ENOENT on startup</div>
              <div class="blocker-body">
                <strong>Cause:</strong> Vite middleware tries to read <code>dist/elements/</code> but the folder does not exist yet.<br>
                <strong>Fix:</strong> Run both builds before starting Vite (Step 2).
              </div>
            </div>

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;Object input has no effect — component shows default value</div>
              <div class="blocker-body">
                <strong>Cause:</strong> Objects and arrays passed as HTML attributes are treated as plain strings by the browser.<br>
                <strong>Fix:</strong> Always set them as DOM properties via a <code>ref</code> inside <code>useEffect</code>:
                <app-code lang="TSX" [id]="'rx-fix-prop'" [text]="code.react.propFix" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:10px"></app-code>
              </div>
            </div>

          </div>
        </section>

        </ng-container><!-- end local dev -->

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

    /* ── Mode toggle ─────────────────────────────────────────── */
    .mode-toggle {
      display: flex; gap: 8px; flex-wrap: wrap;
      margin-bottom: 28px;
    }
    .mode-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 20px; border-radius: 10px;
      border: 1.5px solid #e5e7eb; background: #fff;
      font-size: 13.5px; font-weight: 500; color: #374151;
      cursor: pointer; font-family: inherit; transition: all .14s;
    }
    .mode-btn:hover { border-color: #12C6A8; color: #0d9e87; background: #f0fdfb; }
    .mode-btn--active { border-color: #12C6A8; background: #f0fdfb; color: #0d9e87; font-weight: 700; }

    /* ── Blocker list ────────────────────────────────────────── */
    .blocker-list { display: flex; flex-direction: column; gap: 16px; margin-top: 8px; }
    .blocker-item {
      border: 1px solid #fde68a; border-radius: 10px;
      overflow: hidden;
    }
    .blocker-title {
      background: #fffbeb; padding: 12px 16px;
      font-size: 13.5px; font-weight: 600; color: #92400e;
      border-bottom: 1px solid #fde68a;
    }
    .blocker-body {
      padding: 14px 16px; font-size: 13.5px;
      color: #374151; line-height: 1.75;
    }
  `],
})
export class GettingStartedComponent implements OnInit {
  copied        = '';
  active: Framework = 'angular';
  activeSection = '';
  ngMode: 'published' | 'local' = 'published';
  rxMode: 'published' | 'local' = 'published';

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
      { id: 'ng-prereq',          label: 'Prerequisites'     },
      { id: 'ng-npmrc',           label: '.npmrc Setup'      },
      { id: 'ng-install',         label: 'Install'           },
      { id: 'ng-styles',          label: 'Global Styles'     },
      { id: 'ng-import',          label: 'Import Components' },
      { id: 'ng-use',             label: 'App Shell Example' },
      { id: 'ng-verify',          label: 'Run & Verify'      },
      { id: 'ng-local-prereq',    label: '— Local: Prerequisites' },
      { id: 'ng-local-build',     label: '— Local: Build'    },
      { id: 'ng-local-link1',     label: '— Local: npm link' },
      { id: 'ng-local-syms',      label: '— preserveSymlinks'},
      { id: 'ng-local-blockers',  label: '— Blockers & Fixes'},
    ],
    react: [
      { id: 'rx-prereq',          label: 'Prerequisites'     },
      { id: 'rx-create',          label: 'Create App'        },
      { id: 'rx-npmrc',           label: '.npmrc Setup'      },
      { id: 'rx-install',         label: 'Install'           },
      { id: 'rx-bootstrap',       label: 'Bootstrap Elements'},
      { id: 'rx-types',           label: 'TypeScript Types'  },
      { id: 'rx-use',             label: 'App Shell Example' },
      { id: 'rx-events',          label: 'Events'            },
      { id: 'rx-verify',          label: 'Run & Verify'      },
      { id: 'rx-local-prereq',    label: '— Local: Prerequisites' },
      { id: 'rx-local-build',     label: '— Local: Build'    },
      { id: 'rx-local-vite',      label: '— Local: vite.config'},
      { id: 'rx-local-blockers',  label: '— Blockers & Fixes'},
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

      // ── Local dev snippets ──────────────────────────────────
      localBuild:
`# Run inside the platform-ui library repo
cd path/to/platform-ui
ng build platform-ui --configuration development`,

      localLink1:
`# Run inside dist/platform-ui (the built output folder)
cd path/to/platform-ui/dist/platform-ui
npm link`,

      localLink2:
`# Run inside your Angular consumer app
cd path/to/your-angular-app
npm link @bhairab-patra/platform-ui`,

      preserveSymlinks:
`// angular.json  — add inside architect > build > options
"options": {
  "preserveSymlinks": true,
  "outputPath": "dist/...",
  ...
}`,

      stylesLocal:
`// angular.json  — add to "styles" array
"styles": [
  "node_modules/@bhairab-patra/platform-ui/styles.css",
  "src/styles.css"
]`,

      localServe:
`# Inside your Angular consumer app
cd path/to/your-angular-app
npm start`,

      localDaily:
`# Inside the platform-ui library repo — rebuild after every change
ng build platform-ui --configuration development
# Then just refresh the browser in your Angular app`,

      localWatch:
`# Run in a separate terminal — rebuilds on every file save
ng build platform-ui --configuration development --watch`,

      clearCache:
`# Inside your Angular consumer app (use Git Bash)
rm -rf .angular
npm start`,

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
    <pui-lib-app-shell
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

    </pui-lib-app-shell>
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

      // ── Local dev snippets ──────────────────────────────────
      localBuild:
`# Run inside the platform-ui library repo
cd path/to/platform-ui

# Step 1 — build the Angular component library
ng build platform-ui --configuration development

# Step 2 — build the web components (elements) bundle
ng build elements --configuration production`,

      localElementsBuild:
`# Inside the platform-ui library repo
ng build elements --configuration production`,

      localVite:
`// vite.config.js — in your React app
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname  = path.dirname(fileURLToPath(import.meta.url))

// Adjust relative paths to where platform-ui lives on your machine
const distRoot    = path.resolve(__dirname, '../platform-ui/dist/platform-ui')
const elementsRoot = path.resolve(__dirname, '../platform-ui/dist/elements')

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-pui-assets',
      configureServer(server) {
        // Serve pui-elements.js from dist/elements at dev time
        server.middlewares.use('/pui-elements.js', (_req, res) => {
          const file = path.join(elementsRoot, 'pui-elements.js')
          if (!fs.existsSync(file)) {
            res.statusCode = 404
            res.end('pui-elements.js not found — run: ng build elements --configuration production')
            return
          }
          res.setHeader('Content-Type', 'application/javascript')
          fs.createReadStream(file).pipe(res)
        })
        // Serve tokens / design-token stylesheet
        server.middlewares.use('/tokens.css', (_req, res) => {
          const file = path.join(elementsRoot, 'styles.css')
          if (!fs.existsSync(file)) { res.statusCode = 404; res.end(); return }
          res.setHeader('Content-Type', 'text/css')
          fs.createReadStream(file).pipe(res)
        })
      },
    },
  ],
  resolve: {
    alias: {
      // Imports from '@bhairab-patra/platform-ui' resolve to local dist
      '@bhairab-patra/platform-ui': distRoot,
    },
  },
})`,

      localHtml:
`<!-- index.html — inside <head> -->
<!-- Vite middleware serves this from dist/elements/ -->
<script src="/pui-elements.js"></script>`,

      propFix:
`// ✅ Correct — set objects/arrays as DOM properties via ref
useEffect(() => {
  const el = shellRef.current;
  if (!el) return;
  el.groups          = navGroups;   // array
  el.headerMenuItems = menuItems;   // array
  el.headerBadge     = badgeObj;    // object
}, []);

// ❌ Wrong — this passes the object as a string attribute
<pui-lib-app-shell groups={navGroups} />`,

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
      'pui-lib-app-shell':      PuiProps;
      'pui-lib-header':         PuiProps;
      'pui-lib-sidebar':        PuiProps;
      'pui-lib-button':         PuiProps;
      'pui-lib-badge':          PuiProps;
      'pui-lib-card':           PuiProps;
      'pui-lib-modal':          PuiProps;
      'pui-lib-input':          PuiProps;
      'pui-lib-select':         PuiProps;
      'pui-lib-checkbox':       PuiProps;
      'pui-lib-radio':          PuiProps;
      'pui-lib-textarea':       PuiProps;
      'pui-lib-switch':         PuiProps;
      'pui-lib-spinner':        PuiProps;
      'pui-lib-breadcrumb':     PuiProps;
      'pui-lib-icon':           PuiProps;
      'pui-lib-tooltip':        PuiProps;
      'pui-lib-toast-container':PuiProps;
      'pui-lib-search':         PuiProps;
      'pui-lib-filter-panel':   PuiProps;
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
      <pui-lib-app-shell
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
          <pui-lib-button variant="primary">Get Started</pui-lib-button>
          <pui-lib-badge variant="success" style={{ marginLeft: '12px' }}>Live</pui-lib-badge>
        </div>

      </pui-lib-app-shell>
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
    <pui-lib-app-shell
      ref={shellRef}
      app-title="React App"
      active-id={activeId}
      style={{ height: '100vh', display: 'block' }}>
      <p style={{ padding: 32 }}>Active page: <strong>{activeId}</strong></p>
    </pui-lib-app-shell>
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

  <pui-lib-app-shell
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
        <pui-lib-card id="card1"></pui-lib-card>
        <pui-lib-card id="card2"></pui-lib-card>
        <pui-lib-card id="card3"></pui-lib-card>
      </div>

      <div style="margin-top:24px;display:flex;align-items:center;gap:12px">
        <pui-lib-button id="saveBtn" variant="primary">Save Changes</pui-lib-button>
        <pui-lib-badge variant="success">Live</pui-lib-badge>
      </div>
    </div>

  </pui-lib-app-shell>

  <script>
    /* ── App Shell: set object inputs after element is defined ── */
    customElements.whenDefined('pui-lib-app-shell').then(() => {
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
    customElements.whenDefined('pui-lib-card').then(() => {
      document.getElementById('card1').data = { title: 'Users',   value: '1,284', trend: 'up',   trendValue: '+8%',  subtitle: 'this month'  };
      document.getElementById('card2').data = { title: 'Revenue', value: '$48.2k',trend: 'up',   trendValue: '+12%', subtitle: 'vs last month'};
      document.getElementById('card3').data = { title: 'Tickets', value: '342',   trend: 'down', trendValue: '-5%',  subtitle: 'vs last week' };
    });

    /* ── Button ── */
    customElements.whenDefined('pui-lib-button').then(() => {
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

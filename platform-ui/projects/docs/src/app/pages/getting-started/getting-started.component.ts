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
        <button *ngFor="let fw of frameworks; trackBy: trackByIndex"
          class="fw-tab"
          [class.fw-tab--active]="active === fw.id"
          (click)="setFramework(fw.id)">
          <span class="fw-tab__icon" [innerHTML]="fw.icon"></span>
          {{ fw.label }}
        </button>
      </div>

      <hr class="gs-hr">

      <!-- ║  ANGULAR                                             ║ -->
      <ng-container *ngIf="active === 'angular'">

        <div class="fw-badge fw-badge--angular">Angular 19</div>

        <!-- ── MODE TOGGLE ── -->
        <div class="mode-toggle">
          <button class="mode-btn" [class.mode-btn--active]="ngMode==='published'" (click)="ngMode='published'">
            Published npm (production)
          </button>
          <button class="mode-btn" [class.mode-btn--active]="ngMode==='local'" (click)="ngMode='local'">
            Local Dev (without publishing)
          </button>
        </div>

        <ng-container *ngIf="ngMode==='published'">

        <section id="ng-prereq" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">1</span> Prerequisites</h2>
          <ul class="gs-list">
            <li>Node.js 18+ and npm 9+</li>
            <li>Angular CLI 19+&nbsp;&nbsp;<code>npm install -g &#64;angular/cli</code></li>
            <li>An Angular 19 project — standalone or NgModule both work</li>
            <li>A GitHub Personal Access Token with <code>read:packages</code> scope</li>
          </ul>
          <!-- How it works cards -->
          <div class="hiw-header">
            <span class="hiw-label">How it works</span>
            <span class="hiw-sub">Platform UI ships as <strong>Angular 19 standalone components</strong>. NgModule apps work too — just add them to your <code>imports</code> array.</span>
          </div>
          <div class="hiw-grid">
            <div class="hiw-card">
              
              <div class="hiw-card__title">Standalone import</div>
              <div class="hiw-card__desc">Add the component directly to your standalone component's <code>imports</code></div>
              <code class="hiw-card__code">imports: [PuiButtonComponent]</code>
            </div>
            <div class="hiw-card">
             
              <div class="hiw-card__title">NgModule import</div>
              <div class="hiw-card__desc">Import in your <code>&#64;NgModule</code> — all its components become available in templates</div>
              <code class="hiw-card__code">imports: [PuiButtonComponent]</code>
            </div>
            <div class="hiw-card">
              
              <div class="hiw-card__title">Template binding</div>
              <div class="hiw-card__desc">Use standard Angular <code>[input]</code> and <code>(event)</code> bindings</div>
              <code class="hiw-card__code">[label]="'Save'" (clicked)="onSave()"</code>
            </div>
          </div>
        </section>

        <section id="ng-npmrc" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">2</span> Configure npm for GitHub Packages</h2>
          <p class="gs-p">Create <code>.npmrc</code> in your project root and paste the two lines below. Replace <code>YOUR_GITHUB_PAT_HERE</code> with your token:</p>
          <docs-code-block lang=".npmrc" [id]="'ng-npmrc'" [text]="code.ng.npmrc" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="note note--warn">
            Add <code>.npmrc</code> to <code>.gitignore</code> — never commit a token to source control.
          </div>
        </section>

        <section id="ng-install" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">3</span> Install the Library</h2>
          <docs-code-block lang="bash" [id]="'ng-install'" [text]="code.ng.install" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>

          <h3 class="gs-h3" style="margin-top:24px">Using Module Federation?</h3>
          <p class="gs-p">Add the package to the <code>skip</code> list so Native Federation does not try to re-bundle it:</p>
          <docs-code-block lang="federation.config.js" [id]="'ng-fed'" [text]="code.ng.federation" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
        </section>

        <section id="ng-styles" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">4</span> Add Global Styles</h2>
          <p class="gs-p">
            Open <code>angular.json</code> and add <strong>two</strong> library CSS files to the <code>"styles"</code> array.
            The tokens file defines all CSS custom properties; the theme file applies the default teal colour scheme.
            Consumers import them explicitly — they are never bundled automatically:
          </p>
          <docs-code-block lang="angular.json" [id]="'ng-styles'" [text]="code.ng.styles" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="note note--warn">
            Do <strong>not</strong> import from <code>elements/styles.css</code> — that path is for the Angular Elements / web-component build only.
            Angular consumers always import from <code>styles/tokens.css</code> and <code>styles/themes/theme-new.css</code>.
          </div>
          <div class="note note--warn">
            <strong>A common mistake:</strong> <code>angular.json</code> has a <em>separate</em> <code>"styles"</code> array for every
            architect target — <code>build</code>, <code>test</code>, etc. Adding these two files to <code>architect &gt; test &gt; options &gt; styles</code>
            does nothing for your running app — that array is only read by <code>ng test</code>. They must go in
            <code>architect &gt; build &gt; options &gt; styles</code>, the one used by <code>ng serve</code> and <code>ng build</code>.
            If your components render with no colours, no fonts, and no layout, this is almost always why —
            double-check you edited the right block.
          </div>
        </section>

        <section id="ng-import" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">5</span> Import Components</h2>

          <h3 class="gs-h3">Standalone component (recommended)</h3>
          <docs-code-block lang="TypeScript" [id]="'ng-sa'" [text]="code.ng.standalone" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>

          <h3 class="gs-h3" style="margin-top:24px">NgModule (legacy apps)</h3>
          <docs-code-block lang="TypeScript" [id]="'ng-mod'" [text]="code.ng.ngModule" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
        </section>

        <section id="ng-use" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">6</span> Full App Shell Example</h2>
          <p class="gs-p">
            Drop <code>pui-lib-app-shell</code> into your root component.
            Wire <code>provideRouter(routes)</code> in <code>app.config.ts</code> and place
            <code>&lt;router-outlet /&gt;</code> inside the shell tag — the sidebar navigation
            drives Angular's router automatically via the <code>(sidebarItemSelect)</code> output:
          </p>
          <docs-code-block lang="app.config.ts" [id]="'ng-config'" [text]="code.ng.appConfig" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <docs-code-block lang="app.routes.ts" [id]="'ng-routes'" [text]="code.ng.routes" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:14px"></docs-code-block>
          <docs-code-block lang="app.component.ts" [id]="'ng-shell'" [text]="code.ng.shell" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:14px"></docs-code-block>
          <docs-code-block lang="app.component.html" [id]="'ng-shell-html'" [text]="code.ng.shellHtml" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:14px"></docs-code-block>
        </section>

        <section id="ng-verify" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">7</span> Run &amp; Verify</h2>
          <docs-code-block lang="bash" [id]="'ng-serve'" [text]="'ng serve'" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="note note--success" style="margin-top:18px">
            Open <strong>http://localhost:4200</strong>. You should see the teal header, sidebar rail, and hamburger toggle.
          </div>
        </section>

        </ng-container><!-- end published -->

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
          <docs-code-block lang="bash" [id]="'ng-local-build'" [text]="code.ng.localBuild" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="note note--info">
            Using <code>--configuration development</code> skips the lint step so the build is faster. Never use <code>npm run build:local</code> — it runs lint first and may block.
          </div>
        </section>

        <section id="ng-local-link1" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">3</span> Register the dist Folder Globally</h2>
          <p class="gs-p">Navigate into the <strong>built output folder</strong> and run <code>npm link</code>. This registers <code>&#64;bhairab-patra/platform-ui</code> globally on your machine:</p>
          <docs-code-block lang="bash" [id]="'ng-local-link1'" [text]="code.ng.localLink1" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <p class="gs-p" style="margin-top:10px">Do this <strong>once per machine</strong> (or after a fresh clone). You do not need to repeat it every rebuild.</p>
        </section>

        <section id="ng-local-link2" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">4</span> Link the Consumer App</h2>
          <p class="gs-p">Inside your <strong>Angular consumer app</strong>, link it to the globally registered dist:</p>
          <docs-code-block lang="bash" [id]="'ng-local-link2'" [text]="code.ng.localLink2" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="note note--warn">
            If you run <code>npm install</code> in the consumer later, it will overwrite this symlink.
            Just run the link command again to restore it.
          </div>
        </section>

        <section id="ng-local-syms" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">5</span> Add preserveSymlinks to angular.json</h2>
          <p class="gs-p">Without this, Angular loads two separate copies of <code>&#64;angular/core</code> — one from the library's own <code>node_modules</code> and one from the consumer's. This causes <code>lView</code> errors and injection failures at runtime. Open <code>angular.json</code> and add one line:</p>
          <docs-code-block lang="angular.json" [id]="'ng-local-syms'" [text]="code.ng.preserveSymlinks" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
        </section>

        <section id="ng-local-styles" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">6</span> Add Global Styles</h2>
          <p class="gs-p">Add the two library CSS files to the <code>"styles"</code> array in <code>angular.json</code>. After linking, the symlink makes these resolve to your local <code>dist/platform-ui/styles/</code>:</p>
          <docs-code-block lang="angular.json" [id]="'ng-local-styles'" [text]="code.ng.stylesLocal" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="note note--warn">
            <strong>A common mistake:</strong> <code>angular.json</code> has a <em>separate</em> <code>"styles"</code> array per architect
            target. These files must go in <code>architect &gt; build &gt; options &gt; styles</code> — the one <code>ng serve</code> reads.
            Adding them only under <code>architect &gt; test &gt; options</code> has no effect on your running app and is the #1 cause of
            "components render with no styling at all."
          </div>
        </section>

        <section id="ng-local-import" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">7</span> Import &amp; Use Components</h2>
          <p class="gs-p">Import exactly the same way as the published flow — the symlink makes npm think it is the real package:</p>
          <docs-code-block lang="TypeScript" [id]="'ng-local-import'" [text]="code.ng.standalone" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
        </section>

        <section id="ng-local-serve" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">8</span> Start the App</h2>
          <docs-code-block lang="bash" [id]="'ng-local-serve'" [text]="code.ng.localServe" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="note note--success" style="margin-top:18px">
            Open <strong>http://localhost:4200</strong>. Every time you rebuild the library, refresh the browser — no re-link needed.
          </div>
        </section>

        <section id="ng-local-daily" class="gs-section">
          <h2 class="gs-h2">Day-to-Day: Rebuild on Every Library Change</h2>
          <p class="gs-p">After changing any library source file, rebuild and refresh:</p>
          <docs-code-block lang="bash" [id]="'ng-local-daily'" [text]="code.ng.localDaily" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <h3 class="gs-h3" style="margin-top:20px">Or watch mode — rebuilds automatically on every save:</h3>
          <docs-code-block lang="bash" [id]="'ng-local-watch'" [text]="code.ng.localWatch" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
        </section>

        <section id="ng-local-blockers" class="gs-section">
          <h2 class="gs-h2">Common Blockers &amp; Fixes</h2>

          <div class="blocker-list">

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;<code>lView[15] null</code> or injection errors at startup</div>
              <div class="blocker-body">
                <strong>Cause:</strong> Angular loaded two copies of <code>&#64;angular/core</code> through the symlink.<br>
                <strong>Fix:</strong> Make sure <code>"preserveSymlinks": true</code> is in <code>angular.json</code> (Step 5). Then clear the cache:
                <docs-code-block lang="bash" [id]="'ng-fix-lview'" [text]="code.ng.clearCache" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:10px"></docs-code-block>
              </div>
            </div>

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;Stale output — old component version still shows after rebuild</div>
              <div class="blocker-body">
                <strong>Cause:</strong> Angular compiler cache is holding the old build.<br>
                <strong>Fix:</strong> Delete the cache and restart. Use <code>rm -rf</code> in Git Bash — <code>rmdir /s /q</code> does not work in Git Bash.
                <docs-code-block lang="bash (Git Bash)" [id]="'ng-fix-cache'" [text]="code.ng.clearCache" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:10px"></docs-code-block>
              </div>
            </div>

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;Cannot find module <code>&#64;bhairab-patra/platform-ui</code></div>
              <div class="blocker-body">
                <strong>Cause:</strong> <code>npm install</code> ran after <code>npm link</code> and overwrote the symlink.<br>
                <strong>Fix:</strong> Re-run the link command in the consumer app:
                <docs-code-block lang="bash" [id]="'ng-fix-nomod'" [text]="code.ng.localLink2" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:10px"></docs-code-block>
              </div>
            </div>

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;Build fails — lint errors block the build</div>
              <div class="blocker-body">
                <strong>Cause:</strong> <code>npm run build:local</code> runs lint before compiling.<br>
                <strong>Fix:</strong> Use <code>ng build</code> directly — it skips lint:
                <docs-code-block lang="bash" [id]="'ng-fix-lint'" [text]="code.ng.localBuild" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:10px"></docs-code-block>
              </div>
            </div>

          </div>
        </section>

        </ng-container><!-- end local dev -->

      </ng-container>

      <!-- ║  REACT                                               ║ -->
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

        <ng-container *ngIf="rxMode==='published'">

        <section id="rx-prereq" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">1</span> Prerequisites</h2>
          <ul class="gs-list">
            <li>Node.js 18+ and npm 9+</li>
            <li>A React 18 / 19 project — Vite is recommended</li>
            <li>A GitHub Personal Access Token with <code>read:packages</code> scope</li>
          </ul>

          <!-- How it works cards -->
          <div class="hiw-header">
            <span class="hiw-label">How it works</span>
            <span class="hiw-sub">Platform UI exposes components as <strong>Angular Elements</strong> (Web Components). React 19 supports custom elements natively — no wrapper needed.</span>
          </div>
          <div class="hiw-grid">
            <div class="hiw-card">
               
              <div class="hiw-card__title">String inputs</div>
              <div class="hiw-card__desc">Pass as kebab-case HTML attributes</div>
              <code class="hiw-card__code">app-title="My App"</code>
            </div>
            <div class="hiw-card">
              
              <div class="hiw-card__title">Array / Object inputs</div>
              <div class="hiw-card__desc">Stringify and pass as attribute — Angular parses via <code>attributeChangedCallback</code></div>
              <code class="hiw-card__code">groups='&#123;JSON.stringify(data)&#125;'</code>
            </div>
            <div class="hiw-card">
             
              <div class="hiw-card__title">Events</div>
              <div class="hiw-card__desc">Native CustomEvents — listen via <code>addEventListener</code> on a ref</div>
              <code class="hiw-card__code">ref.addEventListener('sidebarItemSelect', fn)</code>
            </div>
          </div>
        </section>

        <section id="rx-create" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">2</span> Create a React + Vite App (skip if existing)</h2>
          <docs-code-block lang="bash" [id]="'rx-create'" [text]="code.react.create" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
        </section>

        <section id="rx-npmrc" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">3</span> Configure npm for GitHub Packages</h2>
          <p class="gs-p">Create <code>.npmrc</code> in your project root and replace the token:</p>
          <docs-code-block lang=".npmrc" [id]="'rx-npmrc'" [text]="code.react.npmrc" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="note note--warn">Add <code>.npmrc</code> to <code>.gitignore</code> — never commit a token.</div>
        </section>

        <section id="rx-install" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">4</span> Install the Library</h2>
          <docs-code-block lang="bash" [id]="'rx-install'" [text]="code.react.install" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <p class="gs-p" style="margin-top:12px">After install, the files used by React live inside the package:</p>
          <div class="file-list">
            <div class="file-row">
              <span class="file-icon">📄</span>
              <div>
                <div class="file-name">node_modules/&#64;bhairab-patra/platform-ui/elements/pui-elements.js</div>
                <div class="file-desc">All components as Web Components — Angular runtime bundled inside</div>
              </div>
            </div>
            <div class="file-row">
              <span class="file-icon">📄</span>
              <div>
                <div class="file-name">node_modules/&#64;bhairab-patra/platform-ui/elements/runtime.js</div>
                <div class="file-desc">Angular Webpack runtime — must load before pui-elements.js</div>
              </div>
            </div>
            <div class="file-row">
              <span class="file-icon">📄</span>
              <div>
                <div class="file-name">node_modules/&#64;bhairab-patra/platform-ui/elements/polyfills.js</div>
                <div class="file-desc">Zone.js polyfills — must load before pui-elements.js</div>
              </div>
            </div>
            <div class="file-row">
              <span class="file-icon">📄</span>
              <div>
                <div class="file-name">node_modules/&#64;bhairab-patra/platform-ui/styles/tokens.css</div>
                <div class="file-desc">CSS custom properties (design tokens) — load in &lt;head&gt;</div>
              </div>
            </div>
            <div class="file-row">
              <span class="file-icon">📄</span>
              <div>
                <div class="file-name">node_modules/&#64;bhairab-patra/platform-ui/styles/themes/theme-new.css</div>
                <div class="file-desc">Default teal theme — load after tokens.css</div>
              </div>
            </div>
          </div>
        </section>

        <section id="rx-bootstrap" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">5</span> Load the Elements Bundle in index.html</h2>
          <p class="gs-p">
            The Angular Elements bundle is <strong>not an ES module</strong> — it must be loaded as plain <code>&lt;script&gt;</code> tags in <code>index.html</code>,
            <strong>in this exact order</strong>. The styles must also be loaded via <code>&lt;link&gt;</code> tags:
          </p>
          <docs-code-block lang="index.html" [id]="'rx-main'" [text]="code.react.main" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="note note--warn" style="margin-top:14px">
            <strong>Order matters:</strong> runtime.js → polyfills.js → pui-elements.js.
            Loading out of order causes Angular bootstrap to fail silently.
          </div>
        </section>

        <section id="rx-mainjs" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">6</span> Wait for Elements in main.jsx</h2>
          <p class="gs-p">
            Do not render React until the elements bundle has registered all custom elements.
            Use <code>customElements.whenDefined()</code> to gate the initial render:
          </p>
          <docs-code-block lang="src/main.jsx" [id]="'rx-mainjs'" [text]="code.react.mainJsx" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
        </section>

        <section id="rx-types" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">7</span> Add TypeScript Declarations</h2>
          <p class="gs-p">Create <code>src/pui.d.ts</code> so TypeScript recognises all <code>pui-*</code> tags in JSX without errors:</p>
          <docs-code-block lang="src/pui.d.ts" [id]="'rx-types'" [text]="code.react.types" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <p class="gs-p" style="margin-top:14px">Then reference it in <code>tsconfig.json</code>:</p>
          <docs-code-block lang="tsconfig.json" [id]="'rx-tsref'" [text]="code.react.tsconfig" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
        </section>

        <section id="rx-use" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">8</span> Full App Shell Example</h2>
          <p class="gs-p">
            <strong>String inputs</strong> → kebab-case HTML attributes (<code>app-title="My App"</code>).<br>
            <strong>Array / Object inputs</strong> → pass as <code>JSON.stringify()</code> string attributes.
            Angular Elements parses them via <code>attributeChangedCallback</code> which is zone-patched
            and automatically triggers Angular change detection.
          </p>
          <docs-code-block lang="src/App.tsx" [id]="'rx-app'" [text]="code.react.app" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
        </section>

        <section id="rx-events" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">9</span> Handling Events</h2>
          <p class="gs-p">All outputs are native <code>CustomEvent</code>s — use <code>addEventListener</code> via a <code>ref</code> in a <code>useEffect</code>:</p>
          <docs-code-block lang="src/App.tsx" [id]="'rx-events'" [text]="code.react.events" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
        </section>

        <section id="rx-verify" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">10</span> Run &amp; Verify</h2>
          <docs-code-block lang="bash" [id]="'rx-serve'" [text]="'npm run dev'" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="note note--success" style="margin-top:18px">
            Open <strong>http://localhost:5173</strong>. You should see the full Platform UI shell — header, sidebar, and your React content — rendered inside the browser.
          </div>
        </section>

        </ng-container><!-- end published -->

        <ng-container *ngIf="rxMode==='local'">

        <div class="note note--info" style="margin-bottom:28px">
          Use this when you are actively developing the library and want the React app to
          pick up changes instantly — <strong>no publish step required, no npm link needed</strong>.<br><br>
          The mechanism: a <strong>Vite auto-copy plugin</strong> copies the built bundle files from
          <code>dist/elements/</code> into the React app's <code>public/</code> folder on every
          dev server start. Vite then serves them as static files.<br><br>
          <strong>Important:</strong> Angular CLI outputs the main bundle as <code>main.js</code> —
          the plugin copies it to <code>public/pui-elements.js</code> so the script tag in
          <code>index.html</code> stays consistent.
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
          <h2 class="gs-h2"><span class="step-badge">2</span> Build the Elements Bundle</h2>
          <p class="gs-p">Run this inside the <strong>library repo</strong>. The elements build produces the web components bundle that the React app loads:</p>
          <docs-code-block lang="bash" [id]="'rx-local-build'" [text]="code.react.localBuild" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="file-list" style="margin-top:14px">
            <div class="file-row">
              <span class="file-icon">📄</span>
              <div>
                <div class="file-name">dist/elements/main.js</div>
                <div class="file-desc">Web components bundle (Angular CLI names it main.js) — Vite copies it to public/pui-elements.js</div>
              </div>
            </div>
            <div class="file-row">
              <span class="file-icon">📄</span>
              <div>
                <div class="file-name">dist/elements/runtime.js &amp; polyfills.js</div>
                <div class="file-desc">Angular runtime chunks — also copied to public/ and loaded before pui-elements.js</div>
              </div>
            </div>
            <div class="file-row">
              <span class="file-icon">🎨</span>
              <div>
                <div class="file-name">dist/platform-ui/styles/tokens.css &amp; themes/theme-new.css</div>
                <div class="file-desc">Design token CSS files — also copied to public/ and loaded as &lt;link&gt; tags</div>
              </div>
            </div>
          </div>
        </section>

        <section id="rx-local-vite" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">3</span> Configure vite.config.js</h2>
          <p class="gs-p">
            Add a Vite plugin that copies the built bundle files into <code>public/</code> on every server start.
            Vite then serves them as static files at <code>/pui-*.js</code> and <code>/tokens.css</code>.
            The plugin also watches <code>dist/elements/</code> and triggers a full reload when you rebuild.
          </p>
          <docs-code-block lang="vite.config.js" [id]="'rx-local-vite'" [text]="code.react.localVite" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="note note--info" style="margin-top:14px">
            Angular CLI names the main bundle <code>main.js</code>. The plugin copies it to
            <code>public/pui-elements.js</code> so the script tag stays consistent.
          </div>
        </section>

        <section id="rx-local-html" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">4</span> Load All Assets in index.html</h2>
          <p class="gs-p">
            Add the design token CSS files and <strong>three script tags in order</strong> inside <code>&lt;head&gt;</code>.
            All five files are served from <code>public/</code> by Vite:
          </p>
          <docs-code-block lang="index.html" [id]="'rx-local-html'" [text]="code.react.localHtml" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="note note--warn" style="margin-top:14px">
            <strong>Script order is mandatory:</strong> pui-runtime.js → pui-polyfills.js → pui-elements.js.
            Do <strong>not</strong> add <code>type="module"</code> or <code>defer</code> to these — they must run synchronously before React's module script loads.
          </div>
        </section>

        <section id="rx-local-mainjs" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">5</span> Wait for Elements in main.jsx</h2>
          <p class="gs-p">
            Gate the React render with <code>customElements.whenDefined()</code>. This ensures all
            <code>pui-*</code> custom elements are registered before React renders any JSX that references them:
          </p>
          <docs-code-block lang="src/main.jsx" [id]="'rx-local-mainjs'" [text]="code.react.mainJsx" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
        </section>

        <section id="rx-local-types" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">6</span> Add TypeScript Declarations</h2>
          <p class="gs-p">Create <code>src/pui.d.ts</code> so TypeScript recognises all <code>pui-*</code> JSX tags:</p>
          <docs-code-block lang="src/pui.d.ts" [id]="'rx-local-types'" [text]="code.react.types" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <p class="gs-p" style="margin-top:14px">Add it to <code>tsconfig.json</code>:</p>
          <docs-code-block lang="tsconfig.json" [id]="'rx-local-tsref'" [text]="code.react.tsconfig" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
        </section>

        <section id="rx-local-use" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">7</span> Use Components in App.jsx</h2>
          <p class="gs-p">
            String inputs → kebab-case HTML attributes.<br>
            Arrays/Objects → <code>JSON.stringify()</code> string attributes. Angular Elements' <code>attributeChangedCallback</code> is
            zone-patched and triggers change detection automatically — no manual <code>ref</code> property setting needed.
          </p>
          <docs-code-block lang="src/App.tsx" [id]="'rx-local-use'" [text]="code.react.app" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
        </section>

        <section id="rx-local-serve" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">8</span> Start the React App</h2>
          <docs-code-block lang="bash" [id]="'rx-local-serve'" [text]="'npm run dev'" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="note note--success" style="margin-top:18px">
            Open <strong>http://localhost:5173</strong>. On startup Vite copies the built bundle files to <code>public/</code> and serves them.
            You should see the full shell — teal header, dark sidebar with nav groups, and your React content.
          </div>
        </section>

        <section id="rx-local-daily" class="gs-section">
          <h2 class="gs-h2">Day-to-Day: Rebuild the Elements Bundle</h2>
          <p class="gs-p">After changing any library source, rebuild the elements bundle then restart or refresh Vite (it re-copies on server start):</p>
          <docs-code-block lang="bash" [id]="'rx-local-daily'" [text]="code.react.localBuild" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="note note--info" style="margin-top:14px">
            The Vite plugin watches <code>dist/elements/</code> — if you rebuild the elements bundle while Vite is running,
            it detects the file change and triggers a <strong>full browser reload</strong> automatically.
          </div>
        </section>

        <section id="rx-local-blockers" class="gs-section">
          <h2 class="gs-h2">Common Blockers &amp; Fixes</h2>

          <div class="blocker-list">

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;<code>pui-elements.js</code> returns 404</div>
              <div class="blocker-body">
                <strong>Cause:</strong> The elements bundle has not been built yet, or the Vite auto-copy plugin could not find <code>dist/elements/main.js</code>.<br>
                <strong>Fix:</strong> Build the elements bundle, then restart Vite:
                <docs-code-block lang="bash" [id]="'rx-fix-404'" [text]="code.react.localElementsBuild" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:10px"></docs-code-block>
              </div>
            </div>

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;Double header — two header bars appear</div>
              <div class="blocker-body">
                <strong>Cause:</strong> <code>pui-lib-header</code> and <code>pui-lib-sidebar</code> are registered as standalone custom elements in the elements bundle. When <code>pui-lib-app-shell</code> renders its template containing <code>&lt;pui-lib-header&gt;</code>, the browser fires <code>connectedCallback</code> again — bootstrapping a second Angular component instance alongside the one Angular's template engine already manages.<br>
                <strong>Fix:</strong> Do <strong>not</strong> register <code>pui-lib-header</code> or <code>pui-lib-sidebar</code> as custom elements in <code>main.ts</code>. They are internal to the app-shell and managed by Angular's template engine. Only <code>pui-lib-app-shell</code> should be registered as a custom element.
              </div>
            </div>

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;Sidebar groups / menu items not showing</div>
              <div class="blocker-body">
                <strong>Cause:</strong> Passing arrays/objects as JS DOM properties from React's <code>useEffect</code> may not trigger Angular change detection if the property setter runs outside Angular's zone.<br>
                <strong>Fix:</strong> Pass arrays and objects as <code>JSON.stringify()</code> string attributes directly in JSX.
                Angular Elements' <code>attributeChangedCallback</code> is zone-patched and triggers change detection automatically:
                <docs-code-block lang="JSX" [id]="'rx-fix-prop'" [text]="code.react.propFix" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:10px"></docs-code-block>
              </div>
            </div>

            <div class="blocker-item">
              <div class="blocker-title">❌ &nbsp;Components not updating after library rebuild</div>
              <div class="blocker-body">
                <strong>Cause:</strong> Only the library was rebuilt — the elements bundle still has the old code.<br>
                <strong>Fix:</strong> Rebuild the elements bundle. The Vite plugin auto-detects the change in <code>dist/elements/</code> and triggers a full reload:
                <docs-code-block lang="bash" [id]="'rx-fix-stale'" [text]="code.react.localBuild" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)" style="margin-top:10px"></docs-code-block>
              </div>
            </div>

          </div>
        </section>

        </ng-container><!-- end local dev -->

      </ng-container>

      <!-- ║  PLAIN HTML                                          ║ -->
      <ng-container *ngIf="active === 'html'">

        <div class="fw-badge fw-badge--html">Plain HTML</div>

        <!-- How it works cards -->
        <div class="hiw-header" style="margin-top:4px">
          <span class="hiw-label">How it works</span>
          <span class="hiw-sub">No build tool, no bundler, no framework — just a <code>&lt;script&gt;</code> tag. Angular Elements <strong>cannot run from <code>file://</code></strong> — use a local HTTP server.</span>
        </div>
        <div class="hiw-grid" style="margin-bottom:28px">
          <div class="hiw-card">
        
            <div class="hiw-card__title">String inputs</div>
            <div class="hiw-card__desc">Pass as kebab-case HTML attributes directly on the element tag</div>
            <code class="hiw-card__code">app-title="My App"</code>
          </div>
          <div class="hiw-card">
            
            <div class="hiw-card__title">Array / Object inputs</div>
            <div class="hiw-card__desc">Set via <code>element.setAttribute()</code> with a <code>JSON.stringify()</code> value</div>
            <code class="hiw-card__code">el.setAttribute('items', JSON.stringify(arr))</code>
          </div>
          <div class="hiw-card">
            
            <div class="hiw-card__title">Events</div>
            <div class="hiw-card__desc">Native CustomEvents — listen with <code>addEventListener</code></div>
            <code class="hiw-card__code">el.addEventListener('sidebarItemSelect', fn)</code>
          </div>
        </div>

        <section id="html-npmrc" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">1</span> Configure npm for GitHub Packages</h2>
          <p class="gs-p">Create <code>.npmrc</code> in your project folder:</p>
          <docs-code-block lang=".npmrc" [id]="'html-npmrc'" [text]="code.html.npmrc" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <div class="note note--warn">Never commit <code>.npmrc</code> to git.</div>
        </section>

        <section id="html-install" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">2</span> Install the Package</h2>
          <docs-code-block lang="bash" [id]="'html-install'" [text]="code.html.install" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
          <p class="gs-p" style="margin-top:12px">This creates <code>node_modules/&#64;bhairab-patra/platform-ui/elements/</code> with two files you need:</p>
          <div class="file-list">
            <div class="file-row">
              
              <div>
                <div class="file-name">node_modules/&#64;bhairab-patra/platform-ui/elements/pui-elements.js</div>
                <div class="file-desc">All 21 components — Angular runtime included</div>
              </div>
            </div>
            <div class="file-row">
            
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
          <docs-code-block lang="index.html" [id]="'html-full'" [text]="code.html.full" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
        </section>

        <section id="html-serve" class="gs-section">
          <h2 class="gs-h2"><span class="step-badge">4</span> Serve with HTTP server</h2>
          <p class="gs-p">Run this command from the folder that contains your <code>index.html</code> and <code>node_modules/</code>:</p>
          <docs-code-block lang="bash" [id]="'html-serve'" [text]="code.html.serve" [copied]="copied" (copyClick)="doCopy($event.text,$event.id)"></docs-code-block>
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
              <div><strong>Object / Array inputs</strong> → set as JS property after element is defined: <code>el.sidebarGroups = [...]</code></div>
            </div>
            <div class="rule-row">
              <span class="rule-badge rule-badge--ok">✓</span>
              <div><strong>Events</strong> → native <code>addEventListener</code>: <code>el.addEventListener('sidebarItemSelect', fn)</code></div>
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
                <td><code>[sidebarGroups]="navGroups"</code></td>
                <td><code>groups=&#123;JSON.stringify(data)&#125;</code></td>
                <td><code>el.sidebarGroups = data</code></td>
              </tr>
              <tr>
                <td>Output / Event</td>
                <td><code>(sidebarItemSelect)="onNav($event)"</code></td>
                <td><code>el.addEventListener('sidebarItemSelect', fn)</code></td>
                <td><code>el.addEventListener('sidebarItemSelect', fn)</code></td>
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
          <a *ngFor="let n of nextSteps; trackBy: trackByIndex" [routerLink]="n.route" class="next-card">
             
            <div>
              <div class="next-title">{{ n.title }}</div>
              <div class="next-desc">{{ n.desc }}</div>
            </div>
          </a>
        </div>
      </section>

    </article>

    <aside class="otp">
      <div class="otp-label">ON THIS PAGE</div>
      <nav class="otp-nav">
        <a *ngFor="let s of currentSections; trackBy: trackByIndex"
           class="otp-link"
           [class.otp-link--active]="activeSection === s.id"
           tabindex="0"
           role="button"
           (click)="scrollTo(s.id)"
           (keydown.enter)="scrollTo(s.id)"
           (keydown.space)="scrollTo(s.id)">{{ s.label }}</a>
        <div class="otp-sep"></div>
        <a class="otp-link" tabindex="0" role="button" (click)="scrollTo('ref')" (keydown.enter)="scrollTo('ref')" (keydown.space)="scrollTo('ref')">Input / Output Ref</a>
        <a class="otp-link" tabindex="0" role="button" (click)="scrollTo('next')" (keydown.enter)="scrollTo('next')" (keydown.space)="scrollTo('next')">Explore Components</a>
      </nav>

      <div class="fw-mini-tabs">
        <div class="fw-mini-label">Switch framework</div>
        <button *ngFor="let fw of frameworks; trackBy: trackByIndex"
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
    .fw-tab:hover { border-color: #0f5c5e; color: #0f5c5e; background: #f0fdfb; }
    .fw-tab--active { border-color: #0f5c5e; background: #f0fdfb; color: #0f5c5e; font-weight: 600; }
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
      background: #0f5c5e; color: #fff;
      font-size: 13px; font-weight: 700; flex-shrink: 0;
    }

    .note {
      display: block;
      padding: 14px 18px; border-radius: 10px;
      font-size: 13.5px; line-height: 1.65; margin-bottom: 18px;
    }
    .note--info    { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; }
    .note--success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
    .note--warn    { background: #fffbeb; border: 1px solid #fde68a; color: #92400e; }

    /* How it works section */
    .hiw-header {
      display: flex; align-items: baseline; gap: 12px; margin: 18px 0 12px;
      flex-wrap: wrap;
    }
    .hiw-label {
      font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em;
      color: #6b7280; flex-shrink: 0;
    }
    .hiw-sub {
      font-size: 13px; color: #374151; line-height: 1.5;
    }
    .hiw-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;
    }
    @media (max-width: 700px) {
      .hiw-grid { grid-template-columns: 1fr; }
    }
    .hiw-card {
      display: flex; flex-direction: column; gap: 6px;
      background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px;
      padding: 14px 16px;
    }
    .hiw-card__icon { font-size: 20px; line-height: 1; }
    .hiw-card__title { font-size: 13px; font-weight: 700; color: #111827; }
    .hiw-card__desc { font-size: 12px; color: #6b7280; line-height: 1.55; }
    .hiw-card__code {
      display: block; margin-top: 4px;
      font-family: 'Fira Code','Cascadia Code', monospace; font-size: 11.5px;
      background: #e5e7eb; color: #111827; border-radius: 6px;
      padding: 5px 8px; word-break: break-all;
    }

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
    .otp-link--active { color: #0fa78d; border-left-color: #0f5c5e; font-weight: 500; }

    .fw-mini-tabs  { margin-top: 28px; border-top: 1px solid #f3f4f6; padding-top: 16px; }
    .fw-mini-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .09em; color: #9ca3af; margin-bottom: 8px; }
    .fw-mini-btn   {
      display: block; width: 100%; text-align: left;
      padding: 5px 10px; border-radius: 6px; border: none;
      background: transparent; font-size: 12.5px; color: #6b7280;
      cursor: pointer; font-family: inherit; margin-bottom: 2px; transition: background .12s, color .12s;
    }
    .fw-mini-btn:hover { background: #f9fafb; color: #111827; }
    .fw-mini-btn--active { background: #f0fdfb; color: #0f5c5e; font-weight: 600; }

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
    .mode-btn:hover { border-color: #0f5c5e; color: #0f5c5e; background: #f0fdfb; }
    .mode-btn--active { border-color: #0f5c5e; background: #f0fdfb; color: #0f5c5e; font-weight: 700; }

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
  copied = '';
  active: Framework = 'angular';
  activeSection = '';
  ngMode: 'published' | 'local' = 'published';
  rxMode: 'published' | 'local' = 'published';

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    const url = this.router.url;
    if (url.includes('/react')) this.active = 'react';
    else if (url.includes('/html')) this.active = 'html';
    else this.active = 'angular';
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

  trackByIndex(_i: number): number { return _i; }

  get currentSections(): { id: string; label: string }[] {
    return this.sectionMap[this.active] || [];
  }

  sectionMap: Record<Framework, { id: string; label: string }[]> = {
    angular: [
      { id: 'ng-prereq', label: 'Prerequisites' },
      { id: 'ng-npmrc', label: '.npmrc Setup' },
      { id: 'ng-install', label: 'Install' },
      { id: 'ng-styles', label: 'Global Styles' },
      { id: 'ng-import', label: 'Import Components' },
      { id: 'ng-use', label: 'App Shell + Router' },
      { id: 'ng-verify', label: 'Run & Verify' },
      { id: 'ng-local-prereq', label: '— Local: Prerequisites' },
      { id: 'ng-local-build', label: '— Local: Build' },
      { id: 'ng-local-link1', label: '— Local: npm link' },
      { id: 'ng-local-syms', label: '— preserveSymlinks' },
      { id: 'ng-local-styles', label: '— Local: Styles' },
      { id: 'ng-local-blockers', label: '— Blockers & Fixes' },
    ],
    react: [
      { id: 'rx-prereq', label: 'Prerequisites' },
      { id: 'rx-create', label: 'Create App' },
      { id: 'rx-npmrc', label: '.npmrc Setup' },
      { id: 'rx-install', label: 'Install' },
      { id: 'rx-bootstrap', label: 'Load in index.html' },
      { id: 'rx-mainjs', label: 'Wait for Elements' },
      { id: 'rx-types', label: 'TypeScript Types' },
      { id: 'rx-use', label: 'App Shell Example' },
      { id: 'rx-events', label: 'Events' },
      { id: 'rx-verify', label: 'Run & Verify' },
      { id: 'rx-local-prereq', label: '— Local: Prerequisites' },
      { id: 'rx-local-build', label: '— Local: Build' },
      { id: 'rx-local-vite', label: '— Local: vite.config' },
      { id: 'rx-local-html', label: '— Local: index.html' },
      { id: 'rx-local-mainjs', label: '— Local: main.jsx' },
      { id: 'rx-local-blockers', label: '— Blockers & Fixes' },
    ],
    html: [
      { id: 'html-npmrc', label: '.npmrc Setup' },
      { id: 'html-install', label: 'Install' },
      { id: 'html-page', label: 'Create HTML page' },
      { id: 'html-serve', label: 'Serve with HTTP' },
      { id: 'html-events', label: 'Key Rules' },
    ],
  };

  nextSteps = [
    { icon: '🧩', title: 'App Shell', desc: 'Full layout shell with sidebar + header', route: '/app-shell' },
    { icon: '📌', title: 'Header', desc: 'Top bar with nav, avatar, badge', route: '/header' },
    { icon: '🗂️', title: 'Sidebar', desc: 'Collapsible nav rail with groups', route: '/sidebar' },
    { icon: '🔘', title: 'Button', desc: 'Variants, sizes, loading state', route: '/button' },
    { icon: '🃏', title: 'Card', desc: 'Stat cards and content layouts', route: '/card' },
    { icon: '💬', title: 'Modal', desc: 'Dialog overlays and confirmations', route: '/modal' },
    { icon: '🏷️', title: 'Badge', desc: 'Status labels and indicators', route: '/badge' },
    { icon: '📋', title: 'Forms', desc: 'Input, Select, Checkbox, Switch…', route: '/input' },
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
        `// angular.json  — inside architect > build > options ONLY.
// Do NOT add this to architect > test > options — that array only
// affects "ng test" and has zero effect on "ng serve" / "ng build".
"architect": {
  "build": {
    "options": {
      "styles": [
        "node_modules/@bhairab-patra/platform-ui/styles/fonts.css",
        "node_modules/@bhairab-patra/platform-ui/styles/tokens.css",
        "node_modules/@bhairab-patra/platform-ui/styles/themes/theme-new.css",
        "src/styles.scss"
      ]
    }
  }
}`,

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
        `// angular.json  — inside architect > build > options ONLY.
// Do NOT add this to architect > test > options — that array only
// affects "ng test" and has zero effect on "ng serve" / "ng build".
"architect": {
  "build": {
    "options": {
      "styles": [
        "node_modules/@bhairab-patra/platform-ui/styles/fonts.css",
        "node_modules/@bhairab-patra/platform-ui/styles/tokens.css",
        "node_modules/@bhairab-patra/platform-ui/styles/themes/theme-new.css",
        "src/styles.scss"
      ]
    }
  }
}`,

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

      appConfig:
        `// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};`,

      routes:
        `// app.routes.ts  — lazy-load each page component
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',         redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'users',     loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
  { path: 'settings',  loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent) },
  { path: '**',        redirectTo: 'dashboard' },
];`,

      shell:
        `// app.component.ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  PuiAppShellComponent,
  SolifiNavGroup,
  SolifiNavItem,
  SolifiSidebarTheme,
  UserMenuItem,
} from '@bhairab-patra/platform-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, PuiAppShellComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private router = inject(Router);

  activeId = 'dashboard';

  // Header avatar dropdown — its own item shape (label/action), separate
  // from the sidebar's own user-menu items below.
  headerMenuItems: UserMenuItem[] = [
    { label: 'My Profile', action: 'profile' },
    { label: 'Settings',   action: 'settings' },
    { label: 'Sign Out',   action: 'logout', danger: true },
  ];

  navGroups: SolifiNavGroup[] = [
    {
      id: 'main', label: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', route: '/dashboard', iconName: 'dashboard' },
        { id: 'users',     label: 'Users',     route: '/users',     iconName: 'users'     },
      ],
    },
    {
      id: 'config', label: 'Settings',
      items: [
        { id: 'settings', label: 'Settings', route: '/settings', iconName: 'settings' },
      ],
    },
  ];

  sidebarTheme: SolifiSidebarTheme = {
    bg: '#0f172a', textColor: '#94a3b8', activeColor: '#0f5c5e',
  };

  onNavSelect(item: SolifiNavItem): void {
    this.activeId = item.id;
    if (item.route) this.router.navigateByUrl(item.route);
  }

  onHeaderMenuAction(actionId: string): void {
    if (actionId === 'logout') console.log('Signing out…');
  }
}`,

      shellHtml:
        `<!-- app.component.html -->
<!-- Every input is prefixed by which part of the shell it controls:
     sidebarX for the left nav rail, headerX for the top bar. -->
<pui-lib-app-shell
  headerAppTitle="Admin Portal"
  headerAppSubtitle="Management Console"
  headerBgColor="#0f5c5e"
  headerUserName="Jane Doe"
  headerUserEmail="jane@example.com"
  [headerMenuItems]="headerMenuItems"
  (headerMenuAction)="onHeaderMenuAction($event)"
  [sidebarTheme]="sidebarTheme"
  [sidebarGroups]="navGroups"
  [sidebarActiveId]="activeId"
  (sidebarItemSelect)="onNavSelect($event)"
  style="height:100vh;display:block">

  <!-- Router outlet renders inside the shell's content area -->
  <router-outlet />

</pui-lib-app-shell>`,
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

# Build the web components (elements) bundle
# Angular CLI outputs: dist/elements/main.js, runtime.js, polyfills.js
npx ng build elements --configuration production`,

      localElementsBuild:
        `# Inside the platform-ui library repo
npx ng build elements --configuration production`,

      localVite:
        `// vite.config.js — in your React app
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname    = path.dirname(fileURLToPath(import.meta.url))

// Adjust these paths to where platform-ui is on your machine
const elementsRoot = path.resolve(__dirname, '../platform-ui/dist/elements')
const stylesRoot   = path.resolve(__dirname, '../platform-ui/dist/platform-ui/styles')
const publicDir    = path.resolve(__dirname, 'public')

function copyFile(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn('[pui] WARNING: source not found:', src)
    return
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(src, dest)
  console.log('[pui] copied →', path.relative(__dirname, dest))
}

function syncPuiAssets() {
  // Angular CLI names the main bundle main.js — serve it as pui-elements.js
  copyFile(path.join(elementsRoot, 'runtime.js'),  path.join(publicDir, 'pui-runtime.js'))
  copyFile(path.join(elementsRoot, 'polyfills.js'), path.join(publicDir, 'pui-polyfills.js'))
  copyFile(path.join(elementsRoot, 'main.js'),      path.join(publicDir, 'pui-elements.js'))
  // Design tokens
  copyFile(path.join(stylesRoot, 'tokens.css'),              path.join(publicDir, 'tokens.css'))
  copyFile(path.join(stylesRoot, 'themes', 'theme-new.css'), path.join(publicDir, 'themes', 'theme-new.css'))
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'sync-pui-assets',
      buildStart() { syncPuiAssets() },
      configureServer(server) {
        syncPuiAssets()
        // Auto-reload browser when the elements bundle is rebuilt
        server.watcher.on('change', (file) => {
          if (file.includes('dist/elements') || file.includes('dist\\\\elements')) {
            syncPuiAssets()
            server.ws.send({ type: 'full-reload' })
          }
        })
      },
    },
  ],
})`,

      localHtml:
        `<!-- index.html — inside <head> -->
<!-- Design tokens (served from public/ by Vite) -->
<link rel="stylesheet" href="/tokens.css" />
<link rel="stylesheet" href="/themes/theme-new.css" />

<!-- Angular Elements bundle — THREE files, in this exact order -->
<!-- Do NOT add type="module" or defer — must run synchronously -->
<script src="/pui-runtime.js"></script>
<script src="/pui-polyfills.js"></script>
<script src="/pui-elements.js"></script>`,

      propFix:
        `// ✅ Correct — pass arrays/objects as JSON string attributes
// Angular Elements parses them via attributeChangedCallback (zone-patched)
const NAV_GROUPS  = JSON.stringify([{ id: 'main', label: 'Main', items: [...] }])
const MENU_ITEMS  = JSON.stringify([{ label: 'Sign Out', action: 'logout', danger: true }])

<pui-lib-app-shell
  sidebar-groups={NAV_GROUPS}
  header-menu-items={MENU_ITEMS}
  app-title="My App"
/>

// ⚠️ Unreliable — DOM property setting from outside Angular's zone
// may not trigger change detection
useEffect(() => {
  shellRef.current.sidebarGroups = navGroups  // might not update the UI
}, [])`,

      main:
        `<!-- index.html — inside <head> -->
<!-- Design tokens: load before any component renders -->
<link rel="stylesheet" href="node_modules/@bhairab-patra/platform-ui/styles/tokens.css" />
<link rel="stylesheet" href="node_modules/@bhairab-patra/platform-ui/styles/themes/theme-new.css" />

<!-- Elements bundle: THREE files in this exact order -->
<script src="node_modules/@bhairab-patra/platform-ui/elements/runtime.js"></script>
<script src="node_modules/@bhairab-patra/platform-ui/elements/polyfills.js"></script>
<script src="node_modules/@bhairab-patra/platform-ui/elements/main.js"></script>`,

      mainJsx:
        `// src/main.jsx  (or main.tsx)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Wait for the elements bundle to register all pui-* custom elements
// before React renders — prevents "undefined custom element" errors
customElements.whenDefined('pui-lib-button').then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})`,

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
        `// src/App.jsx
import { useRef, useEffect, useState } from 'react'

// Serialize arrays/objects to JSON strings — Angular Elements
// parses them via attributeChangedCallback (zone-patched → auto CD)
const NAV_GROUPS = JSON.stringify([
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
    items: [{ id: 'settings', label: 'General' }],
  },
])

const MENU_ITEMS = JSON.stringify([
  { label: 'My Profile', action: 'profile' },
  { label: 'Sign Out',   action: 'logout', danger: true },
])

export default function App() {
  const shellRef = useRef(null)
  const [activeId, setActiveId] = useState('dashboard')

  // useEffect is only needed for event listeners
  useEffect(() => {
    const el = shellRef.current
    if (!el) return
    const onNav = (e) => setActiveId(e.detail?.id ?? e.detail)
    el.addEventListener('sidebarItemSelect',       onNav)
    el.addEventListener('headerMenuAction', (e) => console.log('menu:', e.detail))
    return () => el.removeEventListener('itemSelect', onNav)
  }, [])

  return (
    <pui-lib-app-shell
      ref={shellRef}
      app-title="React App"
      app-subtitle="Powered by Platform UI"
      header-bg-color="#0f5c5e"
      header-user-name="Jane Doe"
      header-user-email="jane@example.com"
      header-show-help="true"
      sidebar-active-id={activeId}
      sidebar-groups={NAV_GROUPS}
      header-menu-items={MENU_ITEMS}
      style={{ display: 'block', height: '100vh' }}>

      <div style={{ padding: '32px' }}>
        <h1>Dashboard</h1>
        <p>Content rendered inside Platform UI shell from React.</p>
        <pui-lib-button variant="primary">Get Started</pui-lib-button>
        <pui-lib-badge variant="success" style={{ marginLeft: '12px' }}>Live</pui-lib-badge>
      </div>

    </pui-lib-app-shell>
  )
}`,

      events:
        `// src/App.jsx — event handling via addEventListener inside useEffect
import { useRef, useEffect, useState } from 'react'

const NAV_GROUPS = JSON.stringify([
  { id: 'grp-main', label: 'Main', items: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'users',     label: 'Users'     },
  ]},
])

export default function App() {
  const shellRef = useRef(null)
  const [activeId, setActiveId] = useState('dashboard')

  useEffect(() => {
    const el = shellRef.current
    if (!el) return

    const onNav  = (e) => setActiveId(e.detail?.id ?? e.detail)
    const onMenu = (e) => { if (e.detail === 'logout') console.log('Signing out…') }

    el.addEventListener('sidebarItemSelect',       onNav)
    el.addEventListener('headerMenuAction', onMenu)
    el.addEventListener('headerHelpClick',  () => console.log('help!'))

    return () => {
      el.removeEventListener('itemSelect',       onNav)
      el.removeEventListener('headerMenuAction', onMenu)
    }
  }, [])

  return (
    <pui-lib-app-shell
      ref={shellRef}
      app-title="React App"
      sidebar-groups={NAV_GROUPS}
      sidebar-active-id={activeId}
      style={{ display: 'block', height: '100vh' }}>
      <p style={{ padding: 32 }}>Active page: <strong>{activeId}</strong></p>
    </pui-lib-app-shell>
  )
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
    header-bg-color="#0f5c5e"
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

      shell.sidebarGroups = [
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

      shell.addEventListener('sidebarItemSelect', (e) => {
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

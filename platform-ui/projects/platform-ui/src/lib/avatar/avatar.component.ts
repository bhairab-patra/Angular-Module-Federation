import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  inject,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { IconInternalComponent } from '../icon/icon-internal.component';
import { AvatarMenuItem, AvatarSize } from '../models/avatar.model';
import { PuiCustomCssDirective } from '../pui-custom-css.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-avatar',
  standalone: true,
  imports: [NgFor, NgIf, IconInternalComponent],
  encapsulation: ViewEncapsulation.ShadowDom,
  hostDirectives: [{ directive: PuiCustomCssDirective, inputs: ['customCss'] }],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class PuiAvatarComponent {
  @Input() name = '';
  @Input() email = '';
  @Input() avatarUrl = '';
  @Input() size: AvatarSize = 'md';

  // When set, the trigger shows this text (e.g. "Hi, bpatra") instead of
  // name/email, with the avatar chip after it instead of before. The
  // dropdown's own profile header still always shows the real name/email.
  @Input() greeting = '';
  @Input() greetingSubtitle = '';

  get showGreeting(): boolean {
    return !!this.greeting;
  }

  @Input() set collapsed(v: boolean | string) {
    this._collapsed = v === true || v === 'true' || (v as any) === '';
  }
  get collapsed() {
    return this._collapsed;
  }
  private _collapsed = false;

  @Input() set menuItems(v: AvatarMenuItem[] | string) {
    this._menuItems = typeof v === 'string' ? (this._parse<AvatarMenuItem[]>(v) ?? []) : (v ?? []);
  }
  get menuItems(): AvatarMenuItem[] {
    return this._menuItems;
  }
  private _menuItems: AvatarMenuItem[] = [];

  @Output() menuAction = new EventEmitter<string>();
  @Output() openChange = new EventEmitter<boolean>();

  open = false;

  private el = inject(ElementRef);

  get initials(): string {
    return this.name
      .split(' ')
      .map((p) => p[0] ?? '')
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  toggle(): void {
    if (!this.menuItems.length) return;
    this.open = !this.open;
    this.openChange.emit(this.open);
  }

  select(item: AvatarMenuItem): void {
    this.menuAction.emit(item.action);
    this.open = false;
    this.openChange.emit(false);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    const path: EventTarget[] = e.composedPath ? e.composedPath() : [];
    const inside = path.length
      ? path.includes(this.el.nativeElement)
      : this.el.nativeElement.contains(e.target as Node);
    if (this.open && !inside) {
      this.open = false;
      this.openChange.emit(false);
    }
  }

  private _parse<T>(s: string): T | null {
    try {
      return JSON.parse(s) as T;
    } catch {
      return null;
    }
  }
}

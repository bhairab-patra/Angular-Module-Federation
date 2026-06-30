import { Component } from '@angular/core';
import { NgFor, DatePipe } from '@angular/common';
import { ButtonComponent, CardComponent } from 'platform-ui';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'inactive';
  joined: string;
}

@Component({
  selector: 'admin-users',
  standalone: true,
  imports: [NgFor, DatePipe, CardComponent, ButtonComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users: User[] = [
    { id: 1, name: 'Jane Doe',      email: 'jane.doe@corp.com',   role: 'Admin',  status: 'active',   joined: '2024-01-10' },
    { id: 2, name: 'John Smith',    email: 'john.smith@corp.com', role: 'Editor', status: 'active',   joined: '2024-03-22' },
    { id: 3, name: 'Alice Johnson', email: 'alice.j@corp.com',    role: 'Viewer', status: 'inactive', joined: '2024-06-01' },
    { id: 4, name: 'Bob Williams',  email: 'bob.w@corp.com',      role: 'Editor', status: 'active',   joined: '2025-01-15' },
  ];

  onInvite(): void                  { alert('Invite user — wire to your API here.'); }
  onDeactivate(user: User): void    { alert(`Deactivate ${user.name} — wire to your API here.`); }
}

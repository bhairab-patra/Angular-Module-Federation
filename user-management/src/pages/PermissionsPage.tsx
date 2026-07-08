import React, { useState } from 'react';

interface Permission {
  id: string;
  name: string;
  granted: boolean;
}
interface PermGroup {
  group: string;
  icon: string;
  permissions: Permission[];
}

const INITIAL: PermGroup[] = [
  {
    group: 'User Management', icon: '👤',
    permissions: [
      { id: 'user.read',   name: 'View Users',       granted: true },
      { id: 'user.write',  name: 'Create/Edit Users', granted: true },
      { id: 'user.delete', name: 'Delete Users',      granted: false },
    ],
  },
  {
    group: 'Role Management', icon: '🎭',
    permissions: [
      { id: 'role.read',   name: 'View Roles',       granted: true },
      { id: 'role.write',  name: 'Create/Edit Roles', granted: true },
      { id: 'role.delete', name: 'Delete Roles',      granted: false },
    ],
  },
  {
    group: 'Reports', icon: '📊',
    permissions: [
      { id: 'report.view',   name: 'View Reports',   granted: true },
      { id: 'report.export', name: 'Export Reports', granted: false },
    ],
  },
  {
    group: 'System Settings', icon: '⚙️',
    permissions: [
      { id: 'settings.view', name: 'View Settings', granted: false },
      { id: 'settings.edit', name: 'Edit Settings', granted: false },
    ],
  },
];

export default function PermissionsPage() {
  const [groups, setGroups] = useState<PermGroup[]>(INITIAL);
  const [saved, setSaved] = useState(false);

  const toggle = (gi: number, pi: number) => {
    setSaved(false);
    setGroups(prev =>
      prev.map((g, i) => i !== gi ? g : {
        ...g,
        permissions: g.permissions.map((p, j) =>
          j !== pi ? p : { ...p, granted: !p.granted }
        ),
      })
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const totalGranted = groups.flatMap(g => g.permissions).filter(p => p.granted).length;
  const totalPerms   = groups.flatMap(g => g.permissions).length;

  return (
    <div className="um-page">
      <div className="um-toolbar">
        <p className="um-text-muted" style={{ margin: 0 }}>
          {totalGranted} of {totalPerms} permissions granted
        </p>
        <div className="um-actions">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia ducimus corporis sint vero cupiditate? Laborum iusto perspiciatis tenetur, et consectetur enim sed obcaecati molestiae a exercitationem neque est sapiente itaque alias totam voluptates suscipit cupiditate? Aliquid modi harum in dolores! Aliquam nulla perspiciatis at omnis odit ducimus rerum explicabo quam, aliquid pariatur nostrum, qui temporibus maiores, expedita blanditiis. Libero iste voluptatibus nisi neque magnam itaque consequatur nihil esse molestias, tenetur aspernatur beatae nam culpa doloremque molestiae optio ex fuga minus odit cupiditate. Sed maxime, repellat perspiciatis ratione aliquid earum sunt ut officia asperiores necessitatibus dolores eaque placeat excepturi corporis, dicta optio labore? Quisquam dolor sint repellat tenetur corrupti nisi ut! Similique, vero dignissimos quas delectus nihil iure quo nobis adipisci ea, mollitia numquam expedita optio laudantium quasi non perferendis. Asperiores, pariatur optio commodi quibusdam aliquid ipsam, recusandae consequuntur at quam quia repellendus aut. Eos illum veniam adipisci ea provident recusandae velit impedit, cumque id totam deleniti eum nihil nemo molestias perspiciatis similique deserunt unde numquam. Ipsam commodi tempora dignissimos fuga vero inventore deleniti, asperiores quas, quasi totam obcaecati aspernatur dicta minus delectus fugiat dolorem nobis ad voluptatum provident tempore facere culpa consequatur error atque! Aperiam vero tenetur magnam a minus.</p>
        </div>
      </div>

    </div>
   
  );
}

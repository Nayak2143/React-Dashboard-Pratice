import { useEffect, useState } from "react";
import { api } from "@/Instance/Instance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Permission {
  id: number;
  key: string;
  label: string;
}

export default function AddRole() {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const fetchPermissions = async () => {
    try {
      const res = await api.get("/permissions");
      console.log("get permissions res", res?.data);
      setPermissions(res.data.permissions);
    } catch (error: any) {
      console.log(error?.response?.message);
    }
  };

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const submit = async () => {
    // await api.post("/roles", {
    //   name,
    //   permissionIds: selected,
    // });
    // alert("Role created!");
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <div className="space-y-6 max-w-xl">
      <Input
        placeholder="Role name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-3">
        {permissions.map((p) => (
          <label key={p.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(p.id)}
              onChange={() => toggle(p.id)}
            />
            {p.label}
          </label>
        ))}
      </div>

      <Button onClick={submit}>Create Role</Button>
    </div>
  );
}

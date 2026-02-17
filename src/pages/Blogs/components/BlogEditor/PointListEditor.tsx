import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Plus, Trash } from "lucide-react";

type ListType = "bullet" | "number" | "check" | "dash";

export interface PointSection {
  title: string;
  type: ListType;
  points: string[];
}

interface Props {
  onChange?: (data: PointSection) => void;
}

export default function PointListEditor({ onChange }: Props) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<ListType>("bullet");
  const [points, setPoints] = useState<string[]>([""]);

  // ⭐ Notify parent on change
  useEffect(() => {
    onChange?.({ title, type, points });
  }, [title, type, points]);

  const addPoint = () => setPoints([...points, ""]);

  const updatePoint = (index: number, value: string) => {
    const copy = [...points];
    copy[index] = value;
    setPoints(copy);
  };

  const removePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-xl border bg-card p-6 space-y-5">
      <h3 className="font-semibold text-lg">Point-wise Section</h3>

      <div className="space-y-2">
        <Label>Section Heading</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>List Style</Label>

        <Select value={type} onValueChange={(v) => setType(v as ListType)}>
          <SelectTrigger className="w-50">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="bullet">Bullet</SelectItem>
            <SelectItem value="number">Numbered</SelectItem>
            <SelectItem value="check">Check</SelectItem>
            <SelectItem value="dash">Dash</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {points.map((point, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={point}
              onChange={(e) => updatePoint(i, e.target.value)}
            />

            <Button
              size="icon"
              variant="ghost"
              onClick={() => removePoint(i)}
              disabled={points.length === 1}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button type="button" variant="outline" size="sm" onClick={addPoint}>
          <Plus className="mr-2 h-4 w-4" />
          Add Point
        </Button>
      </div>
    </div>
  );
}

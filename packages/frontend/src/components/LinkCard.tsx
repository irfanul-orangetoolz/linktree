
import { Button } from "@/components/ui/button";
import { Trash2, Globe, Grip } from "lucide-react";

export interface LinkItem {
	id?: string
	title: string
	url: string
	is_archived: boolean
  priority: number
  created_at?: string
  update_at?: string
}

interface LinkCardProps {
  link: LinkItem;
  onDelete: (id: string) => void;
  onEdit: (link: LinkItem) => void;
  isDragging?: boolean;
  dragHandleProps?: any;
}

const LinkCard: React.FC<LinkCardProps> = ({
  link,
  onDelete,
  onEdit,
  isDragging,
  dragHandleProps
}) => {
  return (
    <div 
      className={`flex items-center justify-between p-4 border rounded-lg bg-card mb-2 transition-all ${
        isDragging ? "shadow-lg border-primary-500" : ""
      }`}
    >
      <div className="flex items-center gap-2 w-full">
        <div {...dragHandleProps} className="cursor-move p-1">
          <Grip className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="flex-1 overflow-hidden">
          <h3 className="font-medium text-sm truncate">{link.title}</h3>
          <div className="flex items-center text-xs text-muted-foreground truncate">
            <Globe className="h-3 w-3 mr-1" />
            <span className="truncate">{link.url}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 ml-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onEdit(link)}
            className="h-8 w-8"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onDelete(link.id)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;

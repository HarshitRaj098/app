import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ChatHeader() {
  const riyaAvatar = PlaceHolderImages.find((p) => p.id === 'riya-avatar');

  return (
    <header className="flex items-center p-4 border-b bg-card shadow-sm">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-primary/50">
          {riyaAvatar && (
            <AvatarImage
              src={riyaAvatar.imageUrl}
              alt="AI Friend"
              data-ai-hint={riyaAvatar.imageHint}
            />
          )}
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-headline font-bold text-foreground">
            AI Friend
          </h1>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
      </div>
    </header>
  );
}

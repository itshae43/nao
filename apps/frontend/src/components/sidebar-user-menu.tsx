import { useNavigate } from '@tanstack/react-router';
import { Avatar } from './ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { useSession } from '@/lib/auth-client';
import { cn, hideIf } from '@/lib/utils';

interface SidebarUserMenuProps {
	isCollapsed: boolean;
}

export function SidebarUserMenu({ isCollapsed }: SidebarUserMenuProps) {
	const { data: session } = useSession();
	const navigate = useNavigate();
	const username = session?.user?.name;
	const email = session?.user?.email;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type='button'
					className={cn(
						'group flex w-full items-center gap-2 rounded-lg',
						'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
						'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
						'transition-[background-color,padding] duration-300',
						isCollapsed ? 'p-1.5' : 'px-3 py-2',
					)}
				>
					{username && <Avatar username={username} className='shrink-0 size-8' />}

					<span
						className={cn(
							'flex flex-col justify-center text-left h-8 transition-[opacity,visibility] duration-300 overflow-hidden',
							hideIf(isCollapsed),
						)}
					>
						<span className='truncate text-sm font-semibold'>{username}</span>
						<span className='truncate text-xs text-muted-foreground'>{email}</span>
					</span>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				side='top'
				align='start'
				sideOffset={8}
				className='w-[var(--radix-dropdown-menu-trigger-width)]'
			>
				<DropdownMenuItem onClick={() => navigate({ to: '/settings/general' })} className='px-3 py-2'>
					Settings
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem onClick={() => navigate({ to: '/settings/memory' })} className='px-3 py-2'>
					Memory
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => navigate({ to: '/settings/project' })} className='px-3 py-2'>
					Project
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

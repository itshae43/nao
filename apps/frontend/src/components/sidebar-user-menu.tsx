import { ChevronDown } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Avatar } from './ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { cn, hideIf } from '@/lib/utils';
import { useSession } from '@/lib/auth-client';

interface SidebarUserMenuProps {
	isCollapsed: boolean;
}

export function SidebarUserMenu({ isCollapsed }: SidebarUserMenuProps) {
	const { data: session } = useSession();
	const navigate = useNavigate();
	const username = session?.user?.name;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type='button'
					className={cn(
						'group flex w-full items-center gap-2 rounded-lg',
						'hover:bg-sidebar-accent transition-[background-color,padding] duration-300',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
						isCollapsed ? 'p-1.5' : 'px-3 py-2',
					)}
				>
					{username && <Avatar username={username} className='shrink-0' />}

					<span
						className={cn(
							'min-w-0 flex-1 text-left transition-[opacity,visibility] duration-300',
							hideIf(isCollapsed),
						)}
					>
						<span className='block truncate text-sm font-medium'>{username}</span>
					</span>

					{!isCollapsed && (
						<ChevronDown className='h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180' />
					)}
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

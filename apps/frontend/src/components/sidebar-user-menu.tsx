import { LogOut, ChevronDown } from 'lucide-react';
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
import { useSession, signOut } from '@/lib/auth-client';

const settingsNavItems = [
	{ label: 'General', to: '/settings/general' },
	{ label: 'Memory', to: '/settings/memory' },
	{ label: 'Project', to: '/settings/project' },
	{ label: 'Usage & costs', to: '/settings/usage' },
] as const;

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
						'hover:bg-sidebar-accent transition-[background-color,padding] duration-300',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
						isCollapsed ? 'p-1.5' : 'p-3 py-2',
					)}
				>
					{username && <Avatar username={username} className='shrink-0' />}

					<span
						className={cn(
							'flex flex-col justify-center text-left transition-[opacity,visibility] h-8 duration-300',
							hideIf(isCollapsed),
						)}
					>
						<span className='text-sm font-medium'>{username}</span>
						<span className='text-xs text-muted-foreground'>{email}</span>
					</span>
					{!isCollapsed && (
						<ChevronDown className='ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180' />
					)}
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				side='top'
				align='start'
				sideOffset={14}
				className='w-[var(--radix-dropdown-menu-trigger-width)]'
			>
				<div className='flex items-center gap-3 px-2 py-2'>
					{username && <Avatar username={username} className='shrink-0' />}
					<div className='flex flex-col overflow-hidden'>
						<span className='truncate text-sm font-medium'>{username}</span>
						<span className='truncate text-xs text-muted-foreground'>{email}</span>
					</div>
				</div>

				<DropdownMenuSeparator />

				{settingsNavItems.map(({ label, to }) => (
					<DropdownMenuItem key={to} onClick={() => navigate({ to })} className='px-3 py-2'>
						{label}
					</DropdownMenuItem>
				))}

				<DropdownMenuSeparator />

				<DropdownMenuItem onClick={() => signOut()} className=''>
					<LogOut className='h-4 w-4' />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

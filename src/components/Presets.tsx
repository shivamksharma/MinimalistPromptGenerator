import { useNavigate } from 'react-router-dom';
import { usePS1Context } from '../context/PS1Context';
import type { PS1Element } from '../types';

interface Preset {
    id: string;
    title: string;
    description: string;
    elements: PS1Element[];
    preview: string;
}

const presets: Preset[] = [
    {
        id: 'minimal',
        title: 'Minimal',
        description: 'Clean username and directory',
        preview: 'user ~/projects $',
        elements: [
            { id: 'u', label: 'username', fgColor: '#2dd4bf', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: 'W', label: 'directory', fgColor: '#60a5fa', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: '$', label: '$ (user)', fgColor: '#2dd4bf', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false }
        ]
    },
    {
        id: 'git-aware',
        title: 'Git-Aware',
        description: 'Directory with git branch',
        preview: '~/projects [main] $',
        elements: [
            { id: 'w', label: 'full path', fgColor: '#60a5fa', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: '[', label: '[', fgColor: '#6b7280', isBold: false },
            { id: 'git_branch', label: 'git branch', fgColor: '#a78bfa', isBold: false },
            { id: ']', label: ']', fgColor: '#6b7280', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: '$', label: '$ (user)', fgColor: '#2dd4bf', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false }
        ]
    },
    {
        id: 'two-line',
        title: 'Two-Line',
        description: 'User@host on separate line',
        preview: 'user@laptop ~/projects\n→',
        elements: [
            { id: 'u', label: 'username', fgColor: '#2dd4bf', isBold: false },
            { id: '@', label: '@', fgColor: '#6b7280', isBold: false },
            { id: 'h', label: 'hostname', fgColor: '#34d399', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: 'w', label: 'full path', fgColor: '#60a5fa', isBold: false },
            { id: 'newline', label: 'newline', fgColor: '#6b7280', isBold: false },
            { id: 'arrow_r', label: '→', fgColor: '#2dd4bf', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false }
        ]
    },
    {
        id: 'colorful',
        title: 'Colorful',
        description: 'Multi-color with separators',
        preview: 'user | ~/projects | 14:30 →',
        elements: [
            { id: 'u', label: 'username', fgColor: '#f472b6', isBold: true },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: '|', label: '|', fgColor: '#6b7280', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: 'w', label: 'full path', fgColor: '#fbbf24', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: '|', label: '|', fgColor: '#6b7280', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: 'A', label: 'time (HH:MM)', fgColor: '#60a5fa', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: 'arrow_r', label: '→', fgColor: '#2dd4bf', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false }
        ]
    },
    {
        id: 'ultra-light',
        title: 'Ultra-Light',
        description: 'Just directory and prompt',
        preview: 'projects $',
        elements: [
            { id: 'W', label: 'directory', fgColor: '#60a5fa', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: '$', label: '$ (user)', fgColor: '#2dd4bf', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false }
        ]
    },
    {
        id: 'powerline',
        title: 'Powerline-Style',
        description: 'Arrows and segments',
        preview: 'user ⟩ ~/projects ⟩',
        elements: [
            { id: 'u', label: 'username', fgColor: '#2dd4bf', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: '>', label: '⟩', fgColor: '#6b7280', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: 'w', label: 'full path', fgColor: '#60a5fa', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: '>', label: '⟩', fgColor: '#2dd4bf', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false }
        ]
    },
    {
        id: 'time-focused',
        title: 'Time-Focused',
        description: 'Timestamp with directory',
        preview: '[14:30:45] ~/projects $',
        elements: [
            { id: '[', label: '[', fgColor: '#6b7280', isBold: false },
            { id: 'T', label: 'time (HH:MM:SS)', fgColor: '#34d399', isBold: false },
            { id: ']', label: ']', fgColor: '#6b7280', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: 'w', label: 'full path', fgColor: '#60a5fa', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: '$', label: '$ (user)', fgColor: '#2dd4bf', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false }
        ]
    },
    {
        id: 'full-context',
        title: 'Full Context',
        description: 'User, host, path, git, time',
        preview: 'user@laptop ~/projects [main] 14:30 $',
        elements: [
            { id: 'u', label: 'username', fgColor: '#2dd4bf', isBold: false },
            { id: '@', label: '@', fgColor: '#6b7280', isBold: false },
            { id: 'h', label: 'hostname', fgColor: '#34d399', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: 'w', label: 'full path', fgColor: '#60a5fa', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: '[', label: '[', fgColor: '#6b7280', isBold: false },
            { id: 'git_branch', label: 'git branch', fgColor: '#a78bfa', isBold: false },
            { id: ']', label: ']', fgColor: '#6b7280', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: 'A', label: 'time (HH:MM)', fgColor: '#fbbf24', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: '$', label: '$ (user)', fgColor: '#2dd4bf', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false }
        ]
    },
    {
        id: 'compact-git',
        title: 'Compact Git',
        description: 'Short path with git status',
        preview: 'projects (main*) →',
        elements: [
            { id: 'W', label: 'directory', fgColor: '#60a5fa', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: '(', label: '(', fgColor: '#6b7280', isBold: false },
            { id: 'git_branch', label: 'git branch', fgColor: '#a78bfa', isBold: false },
            { id: 'git_dirty', label: 'dirty marker', fgColor: '#f87171', isBold: false },
            { id: ')', label: ')', fgColor: '#6b7280', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: 'arrow_r', label: '→', fgColor: '#2dd4bf', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false }
        ]
    },
    {
        id: 'lambda',
        title: 'Lambda Style',
        description: 'Functional programming aesthetic',
        preview: 'λ ~/projects',
        elements: [
            { id: 'lambda', label: 'λ', fgColor: '#a78bfa', isBold: true },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false },
            { id: 'w', label: 'full path', fgColor: '#60a5fa', isBold: false },
            { id: 'space', label: 'space', fgColor: '#6b7280', isBold: false }
        ]
    }
];

const Presets = () => {
    const { loadPreset } = usePS1Context();
    const navigate = useNavigate();

    const handleLoadPreset = (preset: Preset) => {
        loadPreset(preset.elements);
        navigate('/');
    };

    return (
        <div className="h-full bg-graphite-50 dark:bg-graphite-950 overflow-auto no-scrollbar">
            <div className="px-4 py-4 max-w-6xl mx-auto">
                <div className="mb-4 border-b border-graphite-200 dark:border-graphite-800 pb-3">
                    <h1 className="text-xs uppercase tracking-wider text-graphite-700 dark:text-graphite-300 mb-1">
                        Presets
                    </h1>
                    <p className="text-[10px] text-graphite-500">
                        Load ready-made prompt configurations
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {presets.map((preset) => (
                        <div
                            key={preset.id}
                            className="border border-graphite-200 dark:border-graphite-800 bg-graphite-100 dark:bg-graphite-900"
                        >
                            <div className="p-3 border-b border-graphite-200 dark:border-graphite-800">
                                <h3 className="text-xs text-graphite-700 dark:text-graphite-300 mb-0.5">
                                    {preset.title}
                                </h3>
                                <p className="text-[10px] text-graphite-500">
                                    {preset.description}
                                </p>
                            </div>

                            <div className="p-3 bg-graphite-950 border-b border-graphite-800">
                                <pre className="text-[10px] font-mono text-graphite-300 whitespace-pre-wrap break-all">
                                    {preset.preview}
                                </pre>
                            </div>

                            <div className="p-2">
                                <button
                                    onClick={() => handleLoadPreset(preset)}
                                    className="w-full px-3 py-1.5 text-[10px] uppercase tracking-wider border border-graphite-300 dark:border-graphite-700 text-graphite-700 dark:text-graphite-300 hover:border-accent hover:text-accent"
                                >
                                    Load Preset
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Presets;

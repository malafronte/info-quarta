export interface NavItem {
    label: string;
    href?: string;
    items?: NavItem[]; // For dropdowns
    icon?: string; // Optional icon
}

export const headerNav: NavItem[] = [
    { label: "Gemini CLI", href: "/info-quarta/gemini-cli", icon: "🤖" },
    {
        label: "Extensions",
        icon: "🧩",
        items: [
            { label: "Gallery", href: "/info-quarta/gallery", icon: "🖼️" },
            { label: "About Extensions", href: "/info-quarta/about-extensions", icon: "ℹ️" },
        ],
    },
    { label: "Docs", href: "/info-quarta/docs", icon: "📚" },
    { label: "Changelog", href: "/info-quarta/changelog", icon: "📝" },
];

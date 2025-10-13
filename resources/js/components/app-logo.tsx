import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex size-8 items-center justify-center">
                <AppLogoIcon />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Token Analyzer
                </span>
                <span className="truncate text-xs text-muted-foreground">
                    AI-Powered Security
                </span>
            </div>
        </>
    );
}

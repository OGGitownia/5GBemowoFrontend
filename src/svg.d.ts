

declare module '*.svg' {
    import * as React from 'react';

    // To pozwala na: import { ReactComponent as Icon } from './icon.svg'
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

    // To pozwala na: import icon from './icon.svg'
    const src: string;
    export default src;
}

declare module '*.svg?react' {
    import * as React from 'react';
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}


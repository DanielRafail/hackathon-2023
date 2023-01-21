import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        main: {
            colour: {
                background: string
            }
        },
        widget: {
            colour: {
                background: string,
                text: string
            }
        },
        calendar: {
            events: {
                colour: {
                    background: string,
                    financial: string,
                    deadline: string,
                    social: string,
                    title: string,
                    info: string,
                    timeAndDate: string                    
                }
            }
        }
    }
}

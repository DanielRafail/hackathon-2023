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
                mainText: string,
                subText: string,
                subSubText: string     
            }
        },
        calendar: {
            events: {
                colour: {
                    background: string,
                    entrepreneur: string,
                    development: string,
                    social: string
                }
            }
        },
        jira: {
            project: {
                colour: {
                    good: string,
                    warning: string,
                    alert: string
                }
            }
        }
    }
}

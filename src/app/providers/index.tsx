import compose from "compose-function";

import { withMantine } from "./with-mantine";

const withImageLoader = (Component: React.FC) => (props: any) => <Component {...props} />;

export const withProviders = compose(withMantine, withImageLoader);

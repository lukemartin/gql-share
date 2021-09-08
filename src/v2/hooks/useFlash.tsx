import { useRef, useCallback, useState } from 'react';

type Timeout = ReturnType<typeof setTimeout>;

type Props<T> = {
	defaultProps: T;
	duration?: number;
};

export const useFlash = <T,>({
	defaultProps,
	duration = 1000,
}: Props<T>): [(props: T) => void, T] => {
	const [state, setState] = useState<T>(defaultProps);
	const timeout = useRef<Timeout | null>();

	const flash = useCallback(
		(props: T) => {
			setState(props);

			timeout.current = setTimeout(() => {
				setState(defaultProps);
			}, duration);
		},
		[state],
	);

	return [flash, state];
};

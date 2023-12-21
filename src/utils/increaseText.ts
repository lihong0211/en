export const generate = (
  source: string,
  options: {
    fast: boolean;
    onGenerate?(text: string): void;
    onComplete?(text: string): void;
    onCancel?(): void;
  },
) => {
  const l = source.length;
  let index = 0;
  let timer: any;
  let skip = 0;

  function loop() {
    timer = setTimeout(
      () => {
        if (!options.fast) {
          if (skip > 4 && Math.random() > 0.5) {
            skip = 1;
            return loop();
          }

          if (index > 0) {
            skip++;
          }
        }

        index += options.fast ? 1 : Math.floor(Math.random() * 3);

        const current = source.slice(0, index);

        options.onGenerate?.(current);
        if (index >= l - 1) {
          clearTimeout(timer);
          options.onComplete?.(source);
        } else {
          loop();
        }
      },
      !options.fast ? Math.floor(Math.random() * 50) + 100 : 32,
    );
  }

  loop();

  return () => {
    clearTimeout(timer);
    options.onCancel?.();
  };
};

export const generateAsync = async (
  source: string,
  onGenerate: (source: string) => void,
  fast = false,
) => {
  return await new Promise<string>((resolve, reject) => {
    generate(source, {
      fast,
      onCancel() {
        reject(new Error('已取消'));
      },
      onGenerate,
      onComplete(text) {
        resolve(text);
      },
    });
  });
};

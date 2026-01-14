import type { ViteDevServer } from "vite";
import { launchIDE } from "launch-ide";

/**
 * 解析文件路径和位置信息
 * @param urlPath URL 路径，格式: file:line:column
 */
function parseFileLocation(urlPath: string) {
  const match = urlPath.match(/^(.+?):(\d+):(\d+)$/);
  if (match) {
    return {
      file: match[1],
      line: Number.parseInt(match[2], 10),
      column: Number.parseInt(match[3], 10),
    };
  }

  const lineMatch = urlPath.match(/^(.+?):(\d+)$/);
  if (lineMatch) {
    return {
      file: lineMatch[1],
      line: Number.parseInt(lineMatch[2], 10),
      column: undefined,
    };
  }

  return {
    file: urlPath,
    line: undefined,
    column: undefined,
  };
}

/**
 * 使用 launch-ide 打开文件
 * 基于 launch-ide 包实现，支持：
 * - 自动检测运行中的编辑器
 * - 原生支持 Antigravity 和其他主流编辑器
 */
async function openInEditor(
  file: string,
  line?: number,
  column?: number,
  editor?: string
) {
  try {
    launchIDE({
      file,
      line,
      column,
      editor: editor as any,
    });

    return true;
  } catch (error) {
    console.error("Failed to open file in editor:", error);
    throw error;
  }
}

/**
 * 配置服务器中间件来处理打开编辑器的请求
 */
export function setupOpenInEditorMiddleware(
  server: ViteDevServer,
  editor?: string
) {
  server.middlewares.use(async (req, res, next) => {
    if (req.url?.startsWith("/__open-in-editor")) {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const file = url.searchParams.get("file");

      if (!file) {
        res.statusCode = 400;
        res.end("Missing file parameter");
        return;
      }

      try {
        const { file: filePath, line, column } = parseFileLocation(file);
        await openInEditor(filePath, line, column, editor);

        res.statusCode = 200;
        res.end("OK");
      } catch (error) {
        console.error("Error opening file in editor:", error);
        res.statusCode = 500;
        res.end("Failed to open file in editor");
      }
    } else {
      next();
    }
  });
}

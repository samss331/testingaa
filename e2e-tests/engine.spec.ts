import { testSkipIfWindows } from "./helpers/test_helper";

testSkipIfWindows("send message to engine", async ({ po }) => {
  await po.setUpTernaryPro();
  await po.selectModel({ provider: "Google", model: "Gemini 2.5 Pro" });
  await po.sendPrompt("[dump] tc=turbo-edits");

  await po.snapshotServerDump("request");
  await po.snapshotMessages({ replaceDumpPath: true });
});

testSkipIfWindows(
  "send message to engine - smart context balanced",
  async ({ po }) => {
    await po.setUpTernaryPro();
    const proModesDialog = await po.openProModesDialog({
      location: "home-chat-input-container",
    });
    await proModesDialog.setSmartContextMode("balanced");
    await proModesDialog.close();
    await po.selectModel({ provider: "Google", model: "Gemini 2.5 Pro" });
    await po.sendPrompt("[dump] tc=turbo-edits");

    await po.snapshotServerDump("request");
    await po.snapshotMessages({ replaceDumpPath: true });
  },
);

testSkipIfWindows("send message to engine - openai gpt-4.1", async ({ po }) => {
  await po.setUpTernaryPro();
  // By default, it's using auto which points to Flash 2.5 and doesn't
  // use engine.
  await po.selectModel({ provider: "OpenAI", model: "GPT 4.1" });
  await po.sendPrompt("[dump] tc=turbo-edits");

  await po.snapshotServerDump("request");
});

testSkipIfWindows(
  "send message to engine - anthropic claude sonnet 4",
  async ({ po }) => {
    await po.setUpTernaryPro();
    // By default, it's using auto which points to Flash 2.5 and doesn't
    // use engine.
    await po.selectModel({ provider: "Anthropic", model: "Claude 4 Sonnet" });
    await po.sendPrompt("[dump] tc=turbo-edits");

    await po.snapshotServerDump("request");
  },
);

testSkipIfWindows(
  "smart auto should send message to engine",
  async ({ po }) => {
    await po.setUpTernaryPro();
    await po.sendPrompt("[dump] tc=turbo-edits");

    await po.snapshotServerDump("request");
    await po.snapshotMessages({ replaceDumpPath: true });
  },
);

testSkipIfWindows(
  "regular auto should send message to engine",
  async ({ po }) => {
    await po.setUpTernaryPro();
    const proModesDialog = await po.openProModesDialog({
      location: "home-chat-input-container",
    });
    await proModesDialog.setSmartContextMode("off");
    await proModesDialog.close();
    await po.sendPrompt("[dump] tc=turbo-edits");

    await po.snapshotServerDump("request");
    await po.snapshotMessages({ replaceDumpPath: true });
  },
);

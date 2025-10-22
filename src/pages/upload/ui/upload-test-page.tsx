import { useState } from "react";
import * as mammoth from "mammoth";
import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
  FileInput,
  Alert,
  Divider,
  Tooltip,
  Container,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { faFolder } from "@fortawesome/free-solid-svg-icons/faFolder";

import { downloadJson } from "@/features/test-upload/lib/save-JSON";
import { parseTestText, saveJsonToDirectory } from "@/features/test-upload";
import type { QuizPayload } from "@/shared/types/quiz";
import { normalizeRawText } from "@/features/test-upload/lib/normalize";

export default function UploadTestPage() {
  const [file, setFile] = useState<File | null>(null);
  const [payload, setPayload] = useState<QuizPayload | null>(null);
  const [error, setError] = useState<string>("");

  const handleExtract = async () => {
    try {
      setError("");
      setPayload(null);

      if (!file) throw new Error("Fayl tanlanmagan");
      if (!file.name.toLowerCase().endsWith(".docx")) {
        throw new Error("Faqat .docx yuklang (Word)");
      }

      const arrayBuffer = await file.arrayBuffer();

      const { value } = await mammoth.extractRawText({ arrayBuffer });
      const normalized = normalizeRawText(value);

      const parsed = parseTestText(normalized, file.name);
      setPayload(parsed);
    } catch (e: any) {
      setError(e?.message ?? "Noma’lum xatolik");
    }
  };

  const handleDownload = () => {
    if (!payload) return;
    downloadJson(payload);
  };

  const handleSaveToDir = async () => {
    if (!payload) return;
    try {
      await saveJsonToDirectory(payload);
    } catch (e: any) {
      setError(e?.message ?? "Yozib bo‘lmadi");
    }
  };

  return (
    <Container size="lg" p="lg">
      <Title order={2}>Test upload &rarr; JSON parser</Title>

      <Card withBorder radius="lg" shadow="sm" p="lg">
        <Stack>
          <FileInput
            label="Word (.docx) test faylini yuklang"
            placeholder="raqamli.docx"
            leftSection={<FontAwesomeIcon icon={faUpload} />}
            value={file}
            onChange={setFile}
            accept=".docx"
            clearable
          />

          <Group>
            <Button
              leftSection={<FontAwesomeIcon icon={faInfoCircle} />}
              variant="light"
              onClick={handleExtract}>
              Parse qilish
            </Button>
            <Tooltip label="JSON fayl sifatida yuklab olish">
              <Button
                leftSection={<FontAwesomeIcon icon={faDownload} />}
                disabled={!payload}
                onClick={handleDownload}>
                JSON yuklab olish
              </Button>
            </Tooltip>
            <Tooltip label="File System Access API orqali papkaga yozish (Chrome/Edge)">
              <Button
                leftSection={<FontAwesomeIcon icon={faFolder} />}
                variant="outline"
                disabled={!payload}
                onClick={handleSaveToDir}>
                Papkaga saqlash
              </Button>
            </Tooltip>
          </Group>

          {error && (
            <Alert color="red" title="Xato">
              {error}
            </Alert>
          )}
        </Stack>
      </Card>

      {payload && (
        <>
          <Divider my="md" />
          <Card withBorder radius="lg" shadow="sm" p="md">
            <Title order={4}>Bir nechta parsed element preview</Title>
            <Stack gap="xs">
              {payload.items.map(q => (
                <Card key={q.id} withBorder radius="md" p="sm">
                  <Text fw={600}>
                    {q.order}) {q.question}
                  </Text>
                  <Stack gap={2}>
                    {q.options.map(op => (
                      <Text key={op.text}>
                        {op.key}) {op.text} {op.correct ? "✔" : ""}
                      </Text>
                    ))}
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Card>
        </>
      )}
    </Container>
  );
}

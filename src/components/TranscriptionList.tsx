/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { listTranscriptions } from "../services/api";
import Grid from "@mui/material/Grid";
import FolderIcon from "@mui/icons-material/Folder";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import Box from "@mui/material/Box";

export default function TranscriptionList() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await listTranscriptions();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-2">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <h2 className="text-xl font-semibold mb-2">
          All transcriptions
          <IconButton onClick={fetchData} disabled={loading} title="Reload">
            <RefreshIcon />
          </IconButton>
        </h2>
      </Box>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <List dense>
          {items.length === 0 && <div>No transcriptions yet.</div>}
          {items.map((item) => (
            <ListItem key={item._id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>

              {/* Use Grid for fixed columns */}
              <Grid container spacing={2} wrap="nowrap">
                <Grid item xs={3}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>ID:</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                    {item._id}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Audio URL:</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                    {item.audioUrl}
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Transcription:</strong>
                  </Typography>
                  <Typography variant="body2">{item.transcription}</Typography>
                </Grid>

                <Grid item xs={2}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Created At:</strong>
                  </Typography>
                  <Typography variant="body2">
                    {new Date(item.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

import React from 'react';
import { Box, Typography, Chip, Stack, IconButton, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';

const DashboardCard = ({
  title,
  subtitle,
  tags = [],
  status = '',
  statusType = 'default', // 'passed', 'read', etc.
  liked = false,
  onLike,
  onView,
  actions = [],
  gradient = 'linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)',
  children,
}) => {
  return (
    <Box
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        background: gradient,
        p: 3,
        minHeight: 180,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{ bgcolor: 'rgba(255,255,255,0.7)', fontWeight: 500 }}
          />
        ))}
      </Stack>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {subtitle}
        </Typography>
      )}
      {children}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
        {status && (
          <Chip
            icon={statusType === 'passed' ? <CheckCircleIcon color="success" /> : undefined}
            label={status}
            color={statusType === 'passed' ? 'success' : 'default'}
            size="small"
            sx={{ fontWeight: 500 }}
          />
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title={liked ? 'Unlike' : 'Like'}>
          <IconButton onClick={onLike} size="small" color={liked ? 'error' : 'default'}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="View">
          <IconButton onClick={onView} size="small">
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        {actions.map((action, idx) => (
          <Box key={idx}>{action}</Box>
        ))}
      </Stack>
    </Box>
  );
};

export default DashboardCard; 
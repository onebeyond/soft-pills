import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PillCard = ({ title, description }) => (
  <Card>
    <CardContent>
      <Typography variant="h4">
        {title}
      </Typography>
      <Typography variant="body1">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default PillCard;

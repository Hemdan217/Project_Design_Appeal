import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "What materials are used for the apparel?",
    answer:
      "We use high-quality fabrics such as cotton, wool, silk, and linen.",
  },
  {
    question: "Can I choose the type of fabric for my custom design?",
    answer:
      "Yes, you can select your preferred fabric for your custom apparel.",
  },
  {
    question: "How are the designs printed on the apparel?",
    answer:
      "After you submit your custom design, we assess its feasibility. If needed, we may adjust the design to ensure optimal printing quality. Once you confirm the revised design, we proceed with printing.",
  },
  {
    question: "Do you offer different packaging options?",
    answer: "No, we currently do not offer different packaging options.",
  },
  {
    question: "How can I be sure of the quality of the finished product?",
    answer:
      "We source our fabrics from reputable brands to ensure quality. You can also check our reviews and ratings on the 'Rate and Review' page for customer feedback.",
  },
  {
    question: "What are the shipping options and delivery times?",
    answer:
      "Currently, we do not offer shipping options, but we plan to introduce them in the future. We ensure your orders are printed within 5 working days.",
  },
  {
    question: "Are there any additional costs for shipping or handling?",
    answer:
      "No, there are no additional costs for shipping or handling at this time.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash on delivery, online transfers, and payments directly through our website.",
  },
  {
    question: "Is my payment information secure on your platform?",
    answer:
      "Yes, all payment information on our platform is securely protected.",
  },
  {
    question: "What is your policy for returns, exchanges, or refunds?",
    answer:
      "If you need to make changes to your order, please do so during the order confirmation period. Unfortunately, once the confirmation period is over, we cannot make any changes. If there are any issues upon receiving your order, please record a video of the unboxing and contact us within two days for assistance.",
  },
];

function FAQSection() {
  return (
    <Box sx={{ bgcolor: "#f9f9f9", py: 8 }}>
      <Box maxWidth="md" mx="auto" px={3}>
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 4, color: "#333", fontWeight: "bold" }}
        >
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            sx={{ mb: 2, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                bgcolor: "#fff",
                borderBottom: "1px solid #e0e0e0",
                "&:hover": {
                  bgcolor: "#f0f0f0",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "#fff" }}>
              <Typography sx={{ color: "#555" }}>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}

export default FAQSection;

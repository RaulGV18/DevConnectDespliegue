<?php
// src/Controller/CvController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Dompdf\Dompdf;
use Dompdf\Options;

class CvController extends AbstractController
{
    #[Route('/api/generar-cv', name: 'generar_cv', methods: ['POST'])]
    public function generarCv(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $html = $this->renderView('cv/template.html.twig', [
            'data' => $data,
        ]);

        $dompdf = new Dompdf();
        $dompdf->loadHtml($html);
        $dompdf->render();

        return new Response($dompdf->output(), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="cv.pdf"',
        ]);
    }
}


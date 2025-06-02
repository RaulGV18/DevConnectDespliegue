<?php
// src/Controller/CvController.php

namespace App\Controller;

use Dompdf\Dompdf;
use Dompdf\Options;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Twig\Environment as TwigEnvironment;

class CvController
{
    #[Route('/api/generar-cv', name: 'generar_cv', methods: ['POST'])]
    public function generarCV(Request $request, TwigEnvironment $twig): Response
    {
        $data = json_decode($request->getContent(), true);

        // 1. Renderizar plantilla Twig con los datos recibidos
        $html = $twig->render('cv/plantilla.html.twig', [
            'nombre' => $data['nombre'] ?? '',
            'email' => $data['email'] ?? '',
            'telefono' => $data['telefono'] ?? '',
            'educacion' => $data['educacion'] ?? [],
            'experiencia' => $data['experiencia'] ?? [],
            'habilidades' => $data['habilidades'] ?? [],
        ]);

        // 2. Generar PDF
        $options = new Options();
        $options->set('defaultFont', 'Arial');

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        // 3. Devolver el PDF como respuesta
        return new Response(
            $dompdf->output(),
            200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'inline; filename="cv.pdf"',
            ]
        );
    }
}

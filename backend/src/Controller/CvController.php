<?php
namespace App\Controller;

use Dompdf\Dompdf;
use Dompdf\Options;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Twig\Environment;

class CvController extends AbstractController
{
    #[Route('/api/generar-cv', name: 'generar_cv', methods: ['POST'])]
    public function generarcv(Request $request, Environment $twig): Response
    {
        /** @var UploadedFile|null $foto */
        $foto = $request->files->get('foto');
        $jsonData = $request->request->get('data');

        if (!$jsonData) {
            return new JsonResponse(['error' => 'Datos vacíos'], 400);
        }

        $data = json_decode($jsonData, true);

        $fotoBase64 = null;
        if ($foto && $foto->isValid()) {
            $fotoBase64 = base64_encode(file_get_contents($foto->getPathname()));
        }

        $html = $twig->render('cv/template.html.twig', [
            'data' => $data,
            'fotoBase64' => $fotoBase64,
        ]);

        $options = new Options();
        $options->set('defaultFont', 'Arial');

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4');
        $dompdf->render();

        return new Response($dompdf->output(), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="cv.pdf"',
        ]);
    }
}


<?php
// src/Controller/CvDownloadController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\Routing\Annotation\Route;

class CvDownloadController extends AbstractController
{
    #[Route('/descargar-cv/{ofertaId}/{usuarioId}', name: 'descargar_cv', methods: ['GET'])]
    public function downloadCv(int $ofertaId, int $usuarioId)
    {
        $filename = "oferta{$ofertaId}_usuario{$usuarioId}.pdf";
        $filepath = $this->getParameter('kernel.project_dir') . '/public/uploads/pdfs/' . $filename;

        if (!file_exists($filepath)) {
            throw $this->createNotFoundException('Archivo no encontrado');
        }

        $response = new BinaryFileResponse($filepath);
        $response->setContentDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            $filename
        );

        return $response;
    }
}
